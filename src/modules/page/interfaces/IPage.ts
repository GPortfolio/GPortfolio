import { Options } from 'html-webpack-plugin'

export default interface IPage {
  name(): string
  entryStyle(): string
  entryScript(): string
  entryTemplate(): string
  htmlWebpackOptions(): Options
}
