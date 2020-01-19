(() => {
// Register Service Worker to work offline
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    require('./dev');
  }
})();
