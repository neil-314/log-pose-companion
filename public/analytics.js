// Aggregate page views only. Embedded crew frames must not double-count visits.
(() => {
  if (window.parent !== window || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) return;
  window.va = window.va || function (...args) { (window.vaq = window.vaq || []).push(args); };
  window.va('beforeSend', event => {
    if (event.type !== 'pageview') return null;
    const url = new URL(event.url, location.origin);
    // Never send sign-in codes, email addresses, checkpoint queries or fragments.
    url.search = ''; url.hash = '';
    return { ...event, url: url.href };
  });
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
