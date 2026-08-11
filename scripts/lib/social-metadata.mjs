export function normalizeSocialMetadata(html, { relative, config }) {
  if (relative === '404.html') return html;
  const canonical = getCanonical(html);
  if (!canonical) throw new Error(`Canonical ausente em ${relative}`);

  const existing = {
    ogTitle: getMeta(html, 'property', 'og:title'),
    ogDescription: getMeta(html, 'property', 'og:description'),
    ogType: getMeta(html, 'property', 'og:type'),
    ogLocale: getMeta(html, 'property', 'og:locale'),
    ogSiteName: getMeta(html, 'property', 'og:site_name'),
    ogImage: getMeta(html, 'property', 'og:image'),
    ogImageAlt: getMeta(html, 'property', 'og:image:alt'),
    twitterTitle: getMeta(html, 'name', 'twitter:title'),
    twitterDescription: getMeta(html, 'name', 'twitter:description'),
    twitterImage: getMeta(html, 'name', 'twitter:image'),
    twitterImageAlt: getMeta(html, 'name', 'twitter:image:alt'),
  };

  const title = existing.ogTitle || getTitle(html) || config.siteName;
  const description = existing.ogDescription || getMeta(html, 'name', 'description') || config.tagline;
  const pageName = stripSiteSuffix(title, config.siteName);
  const baseUrl = new URL(config.basePath, config.origin).href;
  const image = existing.ogImage || `${baseUrl}src/assets/images/og-let-flow-369.jpg`;
  const imageAlt = existing.ogImageAlt || existing.twitterImageAlt || `Capa de compartilhamento — ${pageName}`;
  const twitterImage = existing.twitterImage || image;

  const values = {
    ogType: existing.ogType || (relative.startsWith('artigos/') ? 'article' : 'website'),
    ogLocale: existing.ogLocale || String(config.defaultLocale || 'pt-BR').replace('-', '_'),
    ogSiteName: existing.ogSiteName || config.siteName,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage: image,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: imageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: existing.twitterTitle || title,
    twitterDescription: existing.twitterDescription || description,
    twitterImage,
    twitterImageAlt: existing.twitterImageAlt || imageAlt,
  };

  html = html.replace(/\n?<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*\/?>(?:\n)?/gi, '\n');
  html = html.replace(/\n?<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*\/?>(?:\n)?/gi, '\n');

  const block = [
    `<meta property="og:type" content="${attr(values.ogType)}">`,
    `<meta property="og:locale" content="${attr(values.ogLocale)}">`,
    `<meta property="og:site_name" content="${attr(values.ogSiteName)}">`,
    `<meta property="og:title" content="${attr(values.ogTitle)}">`,
    `<meta property="og:description" content="${attr(values.ogDescription)}">`,
    `<meta property="og:url" content="${attr(values.ogUrl)}">`,
    `<meta property="og:image" content="${attr(values.ogImage)}">`,
    `<meta property="og:image:width" content="${attr(values.ogImageWidth)}">`,
    `<meta property="og:image:height" content="${attr(values.ogImageHeight)}">`,
    `<meta property="og:image:alt" content="${attr(values.ogImageAlt)}">`,
    `<meta name="twitter:card" content="${attr(values.twitterCard)}">`,
    `<meta name="twitter:title" content="${attr(values.twitterTitle)}">`,
    `<meta name="twitter:description" content="${attr(values.twitterDescription)}">`,
    `<meta name="twitter:image" content="${attr(values.twitterImage)}">`,
    `<meta name="twitter:image:alt" content="${attr(values.twitterImageAlt)}">`,
  ].join('\n');

  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
    ?? html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  if (!canonicalTag) throw new Error(`Tag canonical ausente em ${relative}`);
  return html.replace(canonicalTag, `${canonicalTag}\n${block}`);
}

function getCanonical(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
    ?? null;
}

function getTitle(html) { return decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || ''); }

function getMeta(html, key, value) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttrs(match[0]);
    if (String(attrs[key] || '').toLowerCase() === value.toLowerCase()) return decode(attrs.content || '');
  }
  return null;
}

function parseAttrs(tag) {
  const out = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) out[match[1].toLowerCase()] = match[3];
  return out;
}

function stripSiteSuffix(value, siteName) {
  const escaped = siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(value).replace(new RegExp(`\\s*[|—–-]\\s*${escaped}\\s*$`, 'i'), '').trim() || siteName;
}
function attr(value) { return String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function decode(value) { return String(value ?? '').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); }
