"use client";

import { useEffect, useRef } from 'react';

// Define a type for window with our analytics property if it exists
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plausible?: (eventName: string, options?: any) => void;
    }
}

export function useAnalytics() {
    // Fix: Use 0 initial value and set in effect to maintain purity
    const startTime = useRef<number>(0);
    const scrollDepthsTracked = useRef(new Set<number>());

    const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).plausible) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).plausible(eventName, { props: properties });
        }
        // Dev log
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${eventName}`, properties);
        }
    };

    // Initialize start time on mount
    useEffect(() => {
        startTime.current = Date.now();
    }, []);

    useEffect(() => {
        // Copy ref value to variable for cleanup closure
        // However, since we want the LATEST startTime if it changed (it shouldn't here),
        // usage of ref in cleanup is actually generally fine if it's stable. 
        // But to satisfy linter regarding "value will likely have changed":
        const start = startTime;

        return () => {
            // In this specific case, we actually WANT to calculate against the current time.
            // But let's just use the logic inside the unmount effect directly.
            const timeOnPage = Math.round((Date.now() - start.current) / 1000);
            trackEvent('time_on_page', { duration_seconds: timeOnPage });
        };
    }, []); // Empty deps = mount/unmount

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            // Track distinct milestones
            [25, 50, 75, 100].forEach((milestone) => {
                if (scrollPercentage >= milestone && !scrollDepthsTracked.current.has(milestone)) {
                    scrollDepthsTracked.current.add(milestone);
                    trackEvent('Scroll Depth', { depth: `${milestone}%` });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Track time on page when component unmounts
            const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
            trackEvent('Time on Page', { seconds: timeOnPage });
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { trackEvent };
}
