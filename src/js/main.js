import jQuery from 'jquery'
import './filter'

window.$ = window.jQuery = jQuery

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
