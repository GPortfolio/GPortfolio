export default interface ITemplate {
  info: {
    // Template/folder name
    name: string

    // Github login
    author: string
  }
  configuration: {
    // Extends for template configuration
  }
}
