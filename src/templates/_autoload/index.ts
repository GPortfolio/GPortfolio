import Application from '../../Application';

const config = Application.make().config();

require(`../${config.template}/index`);
require(`../${config.template}/index.scss`);
