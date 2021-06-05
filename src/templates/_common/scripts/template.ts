export function safeQuotes(str: string): string {
  return str.replace(/"/g, '&quot;');
}

/**
 * @example
 *  /public/myPhoto.png
 *  https://example.com/myPhoto.png
 *  () => require('./myPhoto.png')
 */
export function resolveFile(url: string | Function): string {
  if (typeof url === 'string') {
    return url;
  }

  return url().default;
}
