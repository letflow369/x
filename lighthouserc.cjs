module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node scripts/serve-dist.mjs --port 4173',
      startServerReadyPattern: 'Let Flow 369:',
      url: [
        'http://127.0.0.1:4173/x/index.html',
        'http://127.0.0.1:4173/x/artigos/lsd.html',
        'http://127.0.0.1:4173/x/busca.html',
      ],
      numberOfRuns: 1,
      settings: { chromeFlags: '--headless=new --no-sandbox' },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'categories:accessibility': ['warn', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['warn', { minScore: 0.90 }],
        'document-title': 'error',
        'meta-description': 'error',
        'is-crawlable': 'error',
        'errors-in-console': 'error'
      }
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' }
  }
};
