import $ from 'jquery'

/**
 * List of all active filters.
 * key - the name of the filter
 * value - bool (active or not)
 *
 * @type {Object}
 */
const filters = {}

/**
 * The reference to the DOM element is added when initializing.
 */
let filtersEl
let listEl

/**
 * Animation time (jQuery - show/hide)
 */
const animationTime = 200

/**
 * Filter all filters and get an array of active filters.
 *
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

  listEl.each((key, el) => {
    const technologies = el.getAttribute('data-technologies').split(', ')
    let isFind = true

    for (const filter of activeFilters) {
      if (!technologies.includes(filter)) {
        $(el).hide(animationTime)
        isFind = false
        break
      }
    }

    if (isFind) {
      $(el).show(animationTime)
    }
  })
}

/**
 * Update the status of the filter and update the list of projects.
 *
 * @param event
 */
const eventClickFilter = (event) => {
  const attr = event.target.getAttribute('data-filter')
  filters[attr] = !filters[attr]
  event.target.setAttribute('active', filters[attr])
  updateList()
}

// Initialization
$(() => {
  filtersEl = $('.project-filters__list li')
  listEl = $('.projects-list li')

  // Add all filters to a single object. And listen to the click event.
  filtersEl.each((key, item) => {
    filters[item.getAttribute('data-filter')] = false
    $(item).click(eventClickFilter)
  })
})
