import Config from '../../Config';

const config = Config.get();

require(`../${config.global.template}/index`);
require(`../${config.global.template}/index.scss`);
