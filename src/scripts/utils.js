export function DOMIsLoaded(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}

export function getOffsetTop() {
  return document.documentElement.scrollTop || document.body.scrollTop
}
