import { CONSENT_STORAGE_KEY } from './config';

/**
 * Google Consent Mode v2 defaults, injected inline in <head> so it runs before
 * any tag. Storage is denied until the visitor chooses, which is what keeps EU
 * traffic compliant; a stored choice is replayed immediately so returning
 * visitors are measured without seeing the banner again.
 */
export const consentBootstrapScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try {
  var stored = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
  if (stored === 'granted') {
    gtag('consent','update',{
      ad_storage:'granted',
      ad_user_data:'granted',
      ad_personalization:'granted',
      analytics_storage:'granted'
    });
  }
} catch (error) {}
`;
