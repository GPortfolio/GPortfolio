import { DOMIsLoaded, getOffsetTop } from '../../../scripts/utils'

// DOM elements
let backgroundImageEl = null
let avatarImageEl = null
let headerContentEl = null

// Variables
let backgroundImageHeight = 0

/*
 * Functions
 */

const updateVariables = () => {
  backgroundImageHeight = headerContentEl.clientHeight
}

const updateStyles = () => {
  backgroundImageEl.style.height = `calc(100% + ${backgroundImageEl.clientHeight * .2}px)`
}

/*
 * Window events
 */

const onWindowScroll = (evt) => {
  const offsetTop = getOffsetTop()

  backgroundImageEl.style.transform = `translateY(-${offsetTop * .2}px)`
  headerContentEl.style.transform = `translateY(${offsetTop * .05}px)`
  headerContentEl.style.opacity = (1 - offsetTop / (backgroundImageHeight * 2))
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
  backgroundImageEl = document.querySelector('.background--image')
  headerContentEl = document.querySelector('.header__content')
  avatarImageEl = document.querySelector('.avatar--image')

  // Call all the necessary functions during initialization
  updateVariables()
  updateStyles()

  // Register events
  window.addEventListener('scroll', onWindowScroll)
  window.addEventListener('resize', onWindowResize)
})
