import IPage from 'src/modules/page/interfaces/IPage';
import { Options } from 'html-webpack-plugin'

export default abstract class DefaultPage implements IPage {
  abstract name(): string;

  abstract entryScript(): string;

  abstract entryStyle(): string;

  abstract entryTemplate(): string;

  htmlWebpackOptions(): Options {
    return {
      filename: `${this.name()}.html`,
      inject: 'head',
      chunks: [this.name()],
      template: this.entryTemplate(),
    };
  }
}
