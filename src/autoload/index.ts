/* eslint-disable global-require, import/no-dynamic-require */

import global from '../../core/global';

/*
 * Dynamically load scripts and styles the
 * selected user template
 */
const { template } = require(`../../core/config/accounts/${global.account}/global.json`);

try {
  require(`../templates/${template}/index`);
  require(`../templates/${template}/index.scss`);
} catch (e) {
  // TODO Show message
}
