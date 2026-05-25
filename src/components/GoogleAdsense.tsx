import Script from 'next/script';

/**
 * Google AdSense Component - OPTIMIZED FOR APPROVAL
 * 
 * This component loads Google AdSense code on all pages.
 * AdSense ID: ca-pub-4406313798832895
 * 
 * IMPORTANT: This code is production-ready and optimized for Google AdSense approval.
 */

export default function GoogleAdsense() {
  // Your Google AdSense Publisher ID
  const adsenseId = 'ca-pub-4406313798832895';
  
  // Only hide AdSense in local development (not in production)
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      {/* Google AdSense Verification and Auto Ads Script */}
      <Script
        id="google-adsense"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* AdSense Configuration for Better Performance */}
      <Script
        id="adsense-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
          `,
        }}
      />
    </>
  );
}
