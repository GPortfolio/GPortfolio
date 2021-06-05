import chalk from 'chalk';
import ConsolePrefixLogger from '../../src/modules/logger/ConsolePrefixLogger';

describe('Logger module', () => {
  describe('ConsolePrefixLogger', () => {
    it('log', () => {
      console.log = jest.fn();

      new ConsolePrefixLogger('key').log('value');

      expect(console.log).toHaveBeenCalledWith(chalk.bgGreen(chalk.whiteBright('[key]')), 'value');
    });

    it('warning', () => {
      console.warn = jest.fn();

      new ConsolePrefixLogger('key').warning('value');

      expect(console.warn).toHaveBeenCalledWith(chalk.bgYellow(chalk.whiteBright('[key]')), 'value');
    });

    it('error', () => {
      console.error = jest.fn();

      new ConsolePrefixLogger('key').error('value');

      expect(console.error).toHaveBeenCalledWith(chalk.bgRed(chalk.whiteBright('[key]')), 'value');
    });

    it('info', () => {
      console.info = jest.fn();

      new ConsolePrefixLogger('key').info('value');

      expect(console.info).toHaveBeenCalledWith(chalk.bgBlue(chalk.whiteBright('[key]')), 'value');
    });

    it('debug', () => {
      console.debug = jest.fn();

      new ConsolePrefixLogger('key').debug('value');

      expect(console.debug).toHaveBeenCalledWith(chalk.bgGrey(chalk.whiteBright('[key]')), 'value');
    });
  });
});
