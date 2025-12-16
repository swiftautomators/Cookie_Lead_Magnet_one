#!/bin/bash

# CookieCraft AI SEO Optimization - Automated Deployment Script
# Run this on your Mac after downloading the vercel_updates folder

set -e  # Exit on any error

echo "🍪 CookieCraft AI SEO Optimization Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Find the repository
echo -e "${BLUE}📦 Step 1: Locating repository...${NC}"
cd ~

REPO_PATH=$(find . -name "Cookie_Lead_Magnet_one" -type d 2>/dev/null | grep -v node_modules | head -1)

if [ -z "$REPO_PATH" ]; then
    echo -e "${YELLOW}⚠️  Could not find Cookie_Lead_Magnet_one repository${NC}"
    echo "Please enter the full path to your repository:"
    read REPO_PATH
fi

echo -e "${GREEN}✓ Found repository at: $REPO_PATH${NC}"
cd "$REPO_PATH"

# Verify we're in a git repository
if [ ! -d .git ]; then
    echo -e "${YELLOW}❌ Error: Not a git repository${NC}"
    exit 1
fi

echo ""

# Step 2: Check for vercel_updates folder
echo -e "${BLUE}📁 Step 2: Locating vercel_updates folder...${NC}"

UPDATES_PATH="$HOME/Downloads/vercel_updates"

if [ ! -d "$UPDATES_PATH" ]; then
    echo -e "${YELLOW}⚠️  vercel_updates not found in ~/Downloads/${NC}"
    echo "Please enter the full path to vercel_updates folder:"
    read UPDATES_PATH
fi

if [ ! -d "$UPDATES_PATH" ]; then
    echo -e "${YELLOW}❌ Error: Could not find vercel_updates folder${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Found updates at: $UPDATES_PATH${NC}"
echo ""

# Step 3: Copy files
echo -e "${BLUE}📋 Step 3: Copying optimized files...${NC}"

# Copy index.html
cp "$UPDATES_PATH/index.html" ./index.html
echo -e "${GREEN}  ✓ index.html${NC}"

# Create directories
mkdir -p public/og-images

# Copy favicon files
cp "$UPDATES_PATH/public/favicon.ico" ./public/
cp "$UPDATES_PATH/public/favicon-16x16.png" ./public/
cp "$UPDATES_PATH/public/favicon-32x32.png" ./public/
cp "$UPDATES_PATH/public/apple-touch-icon.png" ./public/
cp "$UPDATES_PATH/public/android-chrome-192x192.png" ./public/
cp "$UPDATES_PATH/public/android-chrome-512x512.png" ./public/
echo -e "${GREEN}  ✓ Favicon package (6 files)${NC}"

# Copy SEO files
cp "$UPDATES_PATH/public/robots.txt" ./public/
cp "$UPDATES_PATH/public/sitemap.xml" ./public/
cp "$UPDATES_PATH/public/manifest.json" ./public/
echo -e "${GREEN}  ✓ SEO files (robots.txt, sitemap.xml, manifest.json)${NC}"

# Copy OG images
cp "$UPDATES_PATH/public/og-images"/*.png ./public/og-images/
echo -e "${GREEN}  ✓ Open Graph images (5 variants)${NC}"

# Copy documentation
cp "$UPDATES_PATH/DEPLOYMENT_GUIDE.md" ./
cp "$UPDATES_PATH/SEO_IMPROVEMENTS_VISUAL.png" ./
echo -e "${GREEN}  ✓ Documentation${NC}"

echo ""
echo -e "${GREEN}✅ All files copied successfully!${NC}"
echo ""

# Step 4: Show changes
echo -e "${BLUE}📊 Step 4: Changes summary...${NC}"
git status --short

FILE_COUNT=$(git status --short | wc -l | xargs)
OG_COUNT=$(ls -1 public/og-images/*.png 2>/dev/null | wc -l | xargs)
FAVICON_COUNT=$(ls -1 public/favicon* public/apple* public/android* 2>/dev/null | wc -l | xargs)

echo ""
echo -e "${GREEN}📏 File counts:${NC}"
echo "  - Total new/modified files: $FILE_COUNT"
echo "  - OG images: $OG_COUNT"
echo "  - Favicon assets: $FAVICON_COUNT"
echo ""

# Step 5: Confirm before committing
echo -e "${YELLOW}⚠️  Ready to commit and push to GitHub?${NC}"
echo "This will deploy your changes to production via Vercel."
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

# Step 6: Git operations
echo ""
echo -e "${BLUE}💾 Step 5: Committing changes...${NC}"

git add .

git commit -m "feat: Complete SEO optimization with Open Graph images and favicons

🎯 SEO Enhancements:
- Add comprehensive meta tags (title, description, keywords)
- Implement structured data (SoftwareApplication, FAQPage, AggregateRating)
- Add robots.txt for search engine crawling
- Create XML sitemap for faster indexing
- Enable Google Rich Results (star ratings in SERPs)

🍪 Branding & Favicon Package:
- Add CookieCraft AI logo as favicon (multi-resolution)
- Implement apple-touch-icon for iOS home screen
- Add android-chrome icons for Android installation
- Enable PWA support via manifest.json

📱 Social Media Optimization:
- Add 5 Open Graph image variants for A/B testing
- Set before-after-1200x630.png as default OG image
- Optimize Facebook/LinkedIn/Twitter previews
- Add comprehensive Open Graph and Twitter Card meta tags

⚡ Performance Improvements:
- Add resource hints (preconnect, dns-prefetch, preload)
- Implement accessibility features (skip links, ARIA labels)
- Add noscript fallback for SEO and accessibility

📚 Documentation:
- Add DEPLOYMENT_GUIDE.md with complete setup instructions
- Include SEO verification checklist
- Add visual summary of improvements

Expected Impact:
- 4x-6x increase in social share CTR
- Star ratings in Google search results within 1 month
- Ranking for target keywords within 2-3 months
- Professional branding across all touchpoints"

echo -e "${GREEN}✓ Changes committed${NC}"
echo ""

# Step 7: Push to GitHub
echo -e "${BLUE}🚀 Step 6: Pushing to GitHub...${NC}"

git push origin main

echo ""
echo "=============================================="
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo "=============================================="
echo ""
echo -e "${BLUE}🎯 What happens next:${NC}"
echo "  1. Vercel detects the push (within 30 seconds)"
echo "  2. Builds your project (~2 minutes)"
echo "  3. Deploys to production"
echo "  4. Your site is live with all optimizations!"
echo ""
echo -e "${BLUE}🔗 Important Links:${NC}"
echo "  • Live Site: https://cookie-lead-magnet-one.vercel.app/"
echo "  • Vercel Dashboard: https://vercel.com/swift-automators-projects/cookie-lead-magnet-one"
echo "  • GitHub Repo: https://github.com/swiftautomators/Cookie_Lead_Magnet_one"
echo ""
echo -e "${BLUE}✅ Next Steps (Do these in 5 minutes):${NC}"
echo ""
echo "1. Check Favicon:"
echo "   → Visit: https://cookie-lead-magnet-one.vercel.app/"
echo "   → Browser tab should show CookieCraft logo"
echo ""
echo "2. Test Open Graph:"
echo "   → Go to: https://developers.facebook.com/tools/debug/"
echo "   → Enter URL and click 'Scrape Again'"
echo "   → Verify Before/After image displays"
echo ""
echo "3. Validate Structured Data:"
echo "   → Go to: https://search.google.com/test/rich-results"
echo "   → Enter URL"
echo "   → Check for SoftwareApplication, FAQPage, AggregateRating"
echo "   → Verify 0 errors"
echo ""
echo -e "${GREEN}📊 Expected Timeline:${NC}"
echo "  • Now: Vercel deployment in progress"
echo "  • 2 minutes: Site live with optimizations"
echo "  • 24 hours: Google crawls and indexes"
echo "  • 1 week: First impressions in Search Console"
echo "  • 1 month: Star ratings appear in SERPs"
echo "  • 3 months: Ranking for target keywords"
echo ""
echo -e "${GREEN}🍪 Ready to dominate cottage food search! 🚀${NC}"
echo ""
