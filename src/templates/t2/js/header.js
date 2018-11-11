import { DOMIsLoaded, getOffsetTop } from '../../../scripts/utils'

// DOM elements
let headerEl = null
let headerLiteEl = null
let backgroundImageEl = null
let headerContentEl = null

// Variables
let backgroundImageHeight = 0
let headerHeight = 0

let _timeout = null
let _isStart = false

/*
 * Functions
 */

const updateVariables = () => {
  backgroundImageHeight = headerContentEl.clientHeight
  headerHeight = headerEl.clientHeight
}

const updateStyles = () => {
  backgroundImageEl.style.height = `calc(100% + ${backgroundImageEl.clientHeight * .2}px)`
}

/*
 * Window events
 */

const onWindowScroll = (evt) => {
  const offsetTop = getOffsetTop()

  if (headerHeight > offsetTop) {
    backgroundImageEl.style.transform = `translateY(-${offsetTop * .2}px)`
    headerContentEl.style.transform = `translateY(${offsetTop * .05}px)`
    headerContentEl.style.opacity = (1 - offsetTop / (backgroundImageHeight * 2))

    if (!_isStart) {
      _isStart = true
      headerLiteEl.classList.remove('animation')
      _timeout = setTimeout(() => {
        console.log('Remove')
        headerLiteEl.classList.remove('show')
      }, 100)
    }
  } else {
    clearTimeout(_timeout)
    backgroundImageEl.style.transform = null
    headerContentEl.style.transform = null
    headerContentEl.style.opacity = null

    if (_isStart) {
      _isStart = false
      headerLiteEl.classList.add('show')
      setTimeout(() => {
        headerLiteEl.classList.add('animation')
      })
    }
  }
}

const onWindowResize = (evt) => {
  updateVariables()
  updateStyles()
}

/*
 * Main part
 */

DOMIsLoaded(() => {
  // Get all elements from DOM
  headerEl = document.querySelector('.header')
  headerLiteEl = document.querySelector('.header-lite')
  backgroundImageEl = document.querySelector('.background--image')
  headerContentEl = document.querySelector('.header-full__content')

  // Call all the necessary functions during initialization
  updateVariables()
  updateStyles()

  // Register events
  window.addEventListener('scroll', onWindowScroll)
  window.addEventListener('resize', onWindowResize)
})
