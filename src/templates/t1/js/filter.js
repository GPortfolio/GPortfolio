import { DOMIsLoaded } from '../../../scripts/utils'

/**
 * List of all active filters.
 * key - the name of the filter
 * value - bool (active or not)
 * @type {Object}
 */
const filters = {}

/**
 * The reference to the DOM element is added when initializing.
 */
let filtersEl
let listEl

/**
 * Filter all filters and get an array of active filters.
 * @return {String[]} - filter names
 */
const getActiveFilters = () => {
  return Object.entries(filters)
    .filter(filter => {
      return filter[1]
    })
    .map(filter => {
      return filter[0]
    })
}

/**
 * Refresh the list of projects depending on the filters (DOM).
 */
const updateList = () => {
  const activeFilters = getActiveFilters()

  listEl.forEach((el, index) => {
    const technologies = el.getAttribute('data-technologies').split(', ')
    let isFind = true

    for (const filter of activeFilters) {
      if (!technologies.includes(filter)) {
        el.classList.add('project-list-li_hide')
        isFind = false
        break
      }
    }

    if (isFind) {
      el.classList.remove('project-list-li_hide')
    }
  })
}

/**
 * Update the status of the filter and update the list of projects.
 * @param {MouseEvent} evt
 */
const eventClickFilter = (evt) => {
  const attr = evt.srcElement.getAttribute('data-filter')
  filters[attr] = !filters[attr]
  evt.srcElement.setAttribute('active', filters[attr])
  updateList()
}

DOMIsLoaded(() => {
  filtersEl = document.querySelectorAll('.project-filters__list li')
  listEl = document.querySelectorAll('.projects-list li')

  // Add all filters to a single object. And listen to the click event.
  filtersEl.forEach((item, index) => {
    filters[item.getAttribute('data-filter')] = false
    item.addEventListener('click', eventClickFilter)
  })
})
