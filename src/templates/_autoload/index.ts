import 'reflect-metadata';
import { di } from '../../di';
import IApplication from '../../interfaces/IApplication';
import { TYPES } from '../../types';

/** @type {IApplication} */
const app = di.get<IApplication>(TYPES.Application);

require(`../${app.config.template}/index`);
require(`../${app.config.template}/index.scss`);
