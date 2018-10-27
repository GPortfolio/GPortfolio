const ATTR_TECHNOLOGIES = 'data-technologies'
const ATTR_FILTER = 'data-filter'
const CLASS_DISABLE = 'disable'

export default class Filter {
  constructor() {
    /**
     * List of all active filters.
     * key - the name of the filter
     * value - bool (active or not)
     * @type {Object}
     */
    this.filters = {}

    this.filtersEl = document.querySelectorAll('.project-filters__list li')
    this.listEl = document.querySelectorAll('.projects-list li')

    // Add all filters to a single object and listen to the click event.
    this.filtersEl.forEach(item => {
      this.filters[item.getAttribute(ATTR_FILTER)] = false
      item.addEventListener('click', this.eventClickFilter.bind(this))
    })
  }

  /**
   * Refresh the list of projects depending on the filters (DOM).
   */
  updateList() {
    const activeFilters = this.getActiveFilters()

    this.listEl.forEach(el => {
      const technologies = el.getAttribute(ATTR_TECHNOLOGIES).split(', ')
      let isFind = true

      for (const filter of activeFilters) {
        if (!technologies.includes(filter)) {
          el.classList.add(CLASS_DISABLE)
          isFind = false
          break
        }
      }

      if (isFind) {
        el.classList.remove(CLASS_DISABLE)
      }
    })
  }

  /**
   * Filter all filters and get an array of active filters.
   * @return {String[]} - filter names
   */
  getActiveFilters() {
    return Object.entries(this.filters)
      .filter(filter => {
        return filter[1]
      })
      .map(filter => {
        return filter[0]
      })
  }

  /**
   * Update the status of the filter and update the list of projects.
   * @param {MouseEvent} evt
   */
  eventClickFilter(evt) {
    const attr = evt.srcElement.getAttribute(ATTR_FILTER)
    this.filters[attr] = !this.filters[attr]
    evt.srcElement.setAttribute('active', this.filters[attr])
    this.updateList()
  }
}
