'use strict'

import { DOMIsLoaded, getOffsetTop } from '@src/scripts/helper'

// DOM elements
let headerEl = null
let backgroundImageEl = null
let headerWrapEl = null

// Variables
let backgroundImageHeight = 0
let headerHeight = 0

/*
 * Functions
 */

const updateVariables = () => {
  backgroundImageHeight = headerWrapEl.clientHeight
  headerHeight = headerEl.clientHeight
}

const updateStyles = () => {
  backgroundImageEl.style.height = `calc(100% + ${backgroundImageEl.clientHeight * .2}px)`
}

const updateStylesScroll = () => {
  const offsetTop = getOffsetTop()

  if (headerHeight > offsetTop) {
    backgroundImageEl.style.transform = `translateY(-${offsetTop * .2}px)`
    headerWrapEl.style.transform = `translateY(${offsetTop * .05}px)`
    headerWrapEl.style.opacity = (1 - offsetTop / (backgroundImageHeight * 2))
  }
}

/*
 * Window events
 */

const onWindowScroll = () => {
  updateStylesScroll()
}

const onWindowResize = () => {
  updateVariables()
  updateStyles()
}

/*
 * Main part
 */

DOMIsLoaded(() => {
  // Get all elements from DOM
  headerEl = document.querySelector('header')
  backgroundImageEl = document.querySelector('.background--image')
  headerWrapEl = document.querySelector('.header__wrap')

  // Call all the necessary functions during initialization
  updateVariables()
  updateStyles()
  updateStylesScroll()

  // Register events
  window.addEventListener('scroll', onWindowScroll)
  window.addEventListener('resize', onWindowResize)
})
