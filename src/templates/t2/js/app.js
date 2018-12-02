import { DOMIsLoaded, getOffsetTop } from '../../../scripts/utils'

let appEl = null

const updateAppClass = () => {
  if (!getOffsetTop()) {
    appEl.classList.add('app_top')
  } else {
    appEl.classList.remove('app_top')
  }
}

const onWindowScroll = (evt) => {
  updateAppClass()
}

DOMIsLoaded(() => {
  appEl = document.querySelector('#app')

  setTimeout(() => {
    updateAppClass()
  }, 500)

  window.addEventListener('scroll', onWindowScroll)
})
