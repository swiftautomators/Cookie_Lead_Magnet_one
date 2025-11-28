import { PricingAnalysis, UserInput } from '../types';

export const sendPricingReport = async (
  recipientEmail: string,
  recipientName: string,
  analysis: PricingAnalysis,
  input: UserInput
) => {
  try {
    // Call the serverless API endpoint instead of Resend directly
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientEmail,
        recipientName,
        analysis,
        input,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new Error(error.message || 'Failed to send email');
  }
};