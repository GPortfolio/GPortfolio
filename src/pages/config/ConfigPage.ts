import DefaultPage from "../../modules/page/DefaultPage";
import path from 'path';

export default class ConfigPage extends DefaultPage {
  name(): string {
    return 'config';
  }

  entryScript(): string {
    return path.resolve(__dirname, 'index.ts');
  }

  entryStyle(): string {
    return path.resolve(__dirname, 'index.scss');
  }

  entryTemplate(): string {
    return path.resolve(__dirname, 'index.ejs');
  }
}
