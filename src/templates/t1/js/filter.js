import $ from 'jquery'

const filters = {}
let filtersEl
let listEl

const getActiveFilters = () => {
  return Object.entries(filters)
    .filter(filter => {
      return filter[1]
    })
    .map(filter => {
      return filter[0]
    })
}

const updateList = () => {
  const activeFilters = getActiveFilters()

  listEl.each((key, el) => {
    const technologies = el.getAttribute('data-technologies').split(', ')
    let isFind = true

    for (const filter of activeFilters) {
      if (!technologies.includes(filter)) {
        el.classList.add('display--none')
        isFind = false
        break
      }
    }

    if (isFind) {
      el.classList.remove('display--none')
    }
  })
}

const eventClickFilter = (event) => {
  const attr = event.target.getAttribute('data-filter')
  filters[attr] = !filters[attr]
  event.target.setAttribute('clicked', filters[attr])
  updateList()
}

// Initialization
$(() => {
  filtersEl = $('.projects__filters li')
  listEl = $('.projects__list > a')

  filtersEl.each((key, item) => {
    filters[item.getAttribute('data-filter')] = false
    $(item).on('click', eventClickFilter)
  })
})
