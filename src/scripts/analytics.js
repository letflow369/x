(() => {
  'use strict';

  const config = window.__LET_FLOW_ANALYTICS__;
  if (!config?.enabled || !/^G-[A-Z0-9]+$/i.test(config.measurementId || '')) return;

  const STORAGE_KEY = 'letflow369.analytics-consent';
  const measurementId = config.measurementId;
  let loaded = false;
  let searchTracked = false;
  const scrollMilestones = new Set();

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* preferência não persistirá */ }
    if (value === 'granted') loadAnalytics();
    removeBanner();
  }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
    bindEditorialEvents();
  }

  function track(name, params = {}) {
    if (!loaded || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  }

  function bindEditorialEvents() {
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      if (link.matches('.reference a, a[href^="#ref-"]')) track('reference_open', { link_url: link.href });
      if (link.closest('.content-network__related')) track('related_article_open', { link_url: link.href });
    });
    const search = document.querySelector('#q[type="search"], input[type="search"]#q');
    search?.addEventListener('input', () => {
      if (!searchTracked && search.value.trim().length >= 2) {
        searchTracked = true;
        track('internal_search_use');
      }
    });
    onScroll();
  }

  function onScroll() {
    const root = document.documentElement;
    const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
    const percent = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    for (const milestone of [25, 50, 75, 100]) {
      if (percent >= milestone && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        track('scroll_depth', { percent_scrolled: milestone });
      }
    }
  }

  function removeBanner() {
    document.querySelector('[data-analytics-consent]')?.remove();
  }

  function showBanner(force = false) {
    removeBanner();
    if (!force && getConsent()) return;
    const banner = document.createElement('aside');
    banner.className = 'analytics-consent';
    banner.dataset.analyticsConsent = '';
    banner.setAttribute('aria-label', 'Preferências de analytics');
    banner.innerHTML = '<p><strong>Medição de audiência</strong><br>Podemos usar analytics para entender leitura e navegação. A ferramenta só será carregada se você aceitar. <a href="' + config.privacyUrl + '">Privacidade</a>.</p><div><button type="button" data-consent="denied">Recusar</button><button type="button" data-consent="granted">Aceitar analytics</button></div>';
    banner.addEventListener('click', (event) => {
      const button = event.target.closest('[data-consent]');
      if (button) setConsent(button.dataset.consent);
    });
    document.body.append(banner);
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-analytics-preferences]')) showBanner(true);
  });

  document.querySelectorAll('[data-analytics-preferences]').forEach((button) => { button.hidden = false; });

  const consent = getConsent();
  if (consent === 'granted') loadAnalytics();
  else if (config.consentRequired !== false) showBanner();
  else loadAnalytics();
})();
