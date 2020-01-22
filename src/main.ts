(() => {
  // Register Service Worker to work offline
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require, import/no-webpack-loader-syntax */
    /*
     * For all pages display the button
     * to go to the settings page
     */
    const btn = document.createElement('a');
    btn.id = '_dev';
    btn.href = '/dev.html';
    btn.target = '_blank';
    btn.innerHTML = require('!!svg-inline-loader!@asset/icons/settings-5-line.svg');

    btn.style.position = 'fixed';
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.right = '20px';
    btn.style.bottom = '20px';

    window.addEventListener('load', () => {
      document.body.append(btn);
    });
  }
})();
