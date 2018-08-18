import packageJson from '../../package'
import jQuery from 'jquery'
import './filter'

window.$ = window.jQuery = jQuery

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(packageJson.url + 'dist/service-worker.js')
}
