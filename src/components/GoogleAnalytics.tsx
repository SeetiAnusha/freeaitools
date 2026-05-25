import Script from 'next/script';

/**
 * Google Analytics Component
 * 
 * Google AdSense approval is HIGHER when you have Google Analytics installed.
 * This shows Google you're serious about your website.
 * 
 * TO ADD GOOGLE ANALYTICS (OPTIONAL BUT RECOMMENDED):
 * 1. Go to: https://analytics.google.com
 * 2. Create account and get your Measurement ID (G-XXXXXXXXXX)
 * 3. Replace 'G-XXXXXXXXXX' below with your actual ID
 */

export default function GoogleAnalytics() {
  // Replace with your Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  // Don't load in development or if ID not set
  if (process.env.NODE_ENV === 'development' || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
