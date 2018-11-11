import { DOMIsLoaded } from '../../../scripts/utils'

// Variables
let el = null
let elements = null
let index = 0

/*
 * Window events
 */

const onWindowScroll = (evt) => {
  const elRect = el.getBoundingClientRect()

  if (window.innerHeight - elRect.y - elRect.height / 2 > 0) {
    elements[0].classList.add('active')

    setInterval(() => {
      if (++index > elements.length - 1) {
        index = 0
      }

      elements[index === 0 ? elements.length - 1 : index - 1].classList.remove('active')
      elements[index].classList.add('active')
    }, 2500)

    window.removeEventListener('scroll', onWindowScroll)
  }
}

/*
 * Main part
 */

DOMIsLoaded(() => {
  el = document.querySelector('.section_skills')
  elements = el.querySelectorAll('.skill')

  if (!elements.length) {
    return
  }

  window.addEventListener('scroll', onWindowScroll)
})
