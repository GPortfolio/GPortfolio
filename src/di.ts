import { Container } from 'inversify';
import { TYPES } from './types';
import ConsolePrefixLogger from './modules/logger/ConsolePrefixLogger';
import ILogger from './modules/logger/interfaces/ILogger';
import ArrayCompareItem from './modules/filter/compareItems/ArrayCompareItem';
import BooleanCompareItem from './modules/filter/compareItems/BooleanCompareItem';
import NumberCompareItem from './modules/filter/compareItems/NumberCompareItem';
import RegExpCompareItem from './modules/filter/compareItems/RegExpCompareItem';
import IFilterCompareItem from './modules/filter/interfaces/IFilterCompareItem';
import Filter from './modules/filter/Filter';
import Sorter from './modules/sorter/Sorter';
import FilterCompare from './modules/filter/FilterCompare';
import githubService from './services/github/config/di';
import defaultTemplate from './templates/default/config/di';
import ConsoleLogger from './modules/logger/ConsoleLogger';
import IPrefixLogger from './modules/logger/interfaces/IPrefixLogger';
import IApplication from './interfaces/IApplication';
import Application from './Application';
import config from '../config';
import IConfig from './interfaces/IConfig';

const di = new Container();

di.bind<IApplication>(TYPES.Application).to(Application);

di.bind<IConfig>(TYPES.UserData).toConstantValue(config);

di.bind<Sorter>(Sorter).toSelf();

di.bind<Filter>(Filter).toSelf();
di.bind<FilterCompare>(FilterCompare).toSelf();
di.bind<IFilterCompareItem>(TYPES.FilterCompareItems).to(ArrayCompareItem);
di.bind<IFilterCompareItem>(TYPES.FilterCompareItems).to(BooleanCompareItem);
di.bind<IFilterCompareItem>(TYPES.FilterCompareItems).to(NumberCompareItem);
di.bind<IFilterCompareItem>(TYPES.FilterCompareItems).to(RegExpCompareItem);

di.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);
di.bind<IPrefixLogger>(TYPES.LoggerPrefix).toDynamicValue(() => new ConsolePrefixLogger('application'));

// Services
githubService(di);

// Templates
defaultTemplate(di);

export { di };

export default di;
