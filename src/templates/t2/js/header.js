import { DOMIsLoaded, getOffsetTop } from '../../../scripts/utils'

// DOM elements
let headerEl = null
let backgroundImageEl = null
let headerContentEl = null

// Variables
let backgroundImageHeight = 0
let headerHeight = 0

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

const updateStylesScroll = () => {
  const offsetTop = getOffsetTop()

  if (headerHeight > offsetTop) {
    backgroundImageEl.style.transform = `translateY(-${offsetTop * .2}px)`
    headerContentEl.style.transform = `translateY(${offsetTop * .05}px)`
    headerContentEl.style.opacity = (1 - offsetTop / (backgroundImageHeight * 2))
  }
}

/*
 * Window events
 */

const onWindowScroll = (evt) => {
  updateStylesScroll()
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
  backgroundImageEl = document.querySelector('.background--image')
  headerContentEl = document.querySelector('.header__content')

  // Call all the necessary functions during initialization
  updateVariables()
  updateStyles()
  updateStylesScroll()

  // Register events
  window.addEventListener('scroll', onWindowScroll)
  window.addEventListener('resize', onWindowResize)
})
