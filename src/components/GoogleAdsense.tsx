import Script from 'next/script';

/**
 * Google AdSense Component
 * 
 * HOW TO ADD YOUR ADSENSE CODE:
 * =============================
 * 
 * 1. Apply to Google AdSense at: https://www.google.com/adsense
 * 2. After applying, Google will give you a code snippet like this:
 * 
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
 *         crossorigin="anonymous"></script>
 * 
 * 3. Copy YOUR publisher ID (the ca-pub-XXXXXXXXXX part)
 * 4. Replace 'YOUR_ADSENSE_ID_HERE' below with your actual ID
 * 
 * EXAMPLE:
 * If Google gives you: ca-pub-1234567890123456
 * Change line 25 to: const adsenseId = 'ca-pub-1234567890123456';
 * 
 * That's it! Your AdSense code will automatically appear on all pages.
 */

export default function GoogleAdsense() {
  // 👇 REPLACE THIS WITH YOUR ACTUAL ADSENSE ID
  const adsenseId = 'ca-pub-4406313798832895';
  
  // Don't show AdSense in development or if ID not set
  if (process.env.NODE_ENV === 'development' || adsenseId === 'ca-pub-4406313798832895') {
    return null;
  }

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
