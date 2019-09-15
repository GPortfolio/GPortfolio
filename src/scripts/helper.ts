'use strict';

/**
 * @param {function} callback
 * @return {void}
 */
export function DOMIsLoaded (callback: () => {}) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * @return {number}
 */
export function getOffsetTop () {
  return document.documentElement.scrollTop || document.body.scrollTop;
}
