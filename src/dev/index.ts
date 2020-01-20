/* eslint-disable global-require, import/no-webpack-loader-syntax, import/no-dynamic-require */

import global from '../../core/global';

(() => {
  const { template } = require(`../../core/config/accounts/${global.account}/global.json`);

  require(`../templates/${template}/index`);
  require(`../templates/${template}/index.scss`);

  const btn = document.createElement('div');
  btn.id = '_dev';
  btn.innerHTML = require('!!svg-inline-loader!@asset/icons/settings-5-line.svg');

  const toggle = () => {
    btn.classList.toggle('active');
  };

  const init = () => {
    btn.removeEventListener('click', init);
    btn.addEventListener('click', toggle);

    console.log('---');
  };

  btn.addEventListener('click', init);

  window.addEventListener('load', () => {
    document.body.append(btn);
  });
})();
