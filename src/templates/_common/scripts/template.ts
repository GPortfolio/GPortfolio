export function safeQuotes(str: string) {
  return str.replace(/"/g, '&quot;')
}
