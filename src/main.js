'use strict'

// Register Service Worker to work offline
// eslint-disable-next-line
if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}
