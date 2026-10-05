'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { analyticsConfig } from './config';
import { trackPageView } from './events';
import { ScrollDepthTracker } from './scroll-depth-tracker';
import { useConsent } from './use-consent';

export function AnalyticsProvider() {
  const { gtmId, gaMeasurementId, metaPixelId, googleAdsId, clarityProjectId } = analyticsConfig;

  // Google tags run under Consent Mode, so they can load straight away and hold
  // back storage themselves. Session recording and the Meta pixel work
  // differently: they wait here until the visitor has said yes.
  const hasConsent = useConsent() === 'granted';

  return (
    <>
      {gtmId && (
        <>
          <Script id='sk-gtm' strategy='afterInteractive'>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
              title='Google Tag Manager'
            />
          </noscript>
        </>
      )}

      {/* Only load gtag.js directly when there is no GTM container, otherwise GA4 would double count. */}
      {!gtmId && (gaMeasurementId || googleAdsId) && (
        <>
          <Script
            id='sk-gtag-src'
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId ?? googleAdsId}`}
          />
          <Script id='sk-gtag-config' strategy='afterInteractive'>
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${gaMeasurementId ? `gtag('config', '${gaMeasurementId}', { send_page_view: true });` : ''}
${googleAdsId ? `gtag('config', '${googleAdsId}');` : ''}`}
          </Script>
        </>
      )}

      {metaPixelId && hasConsent && (
        <Script id='sk-meta-pixel' strategy='afterInteractive'>
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      )}

      {clarityProjectId && hasConsent && (
        <Script id='sk-clarity' strategy='afterInteractive'>
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityProjectId}");
window.clarity('consent');`}
        </Script>
      )}

      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <ScrollDepthTracker />
    </>
  );
}

/**
 * The App Router does not trigger a full page load between routes, so every
 * client-side navigation needs an explicit page_view. The very first view is
 * already reported by the container load, hence the skip on mount.
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const query = searchParams.toString();
    trackPageView({ url: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams]);

  return null;
}
