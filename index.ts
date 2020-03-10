#!/usr/bin/env node

import backCmd from 'commander';

import colors from 'colors';
import program from './package.json';
import { backupHandler } from './src/backupHandler.js';
import { installHandler } from './src/installHandler.js';

backCmd.version(program.version).name('backup-global|bkg');

backCmd
  .command('backup')
  .alias('b')
  .option('-n --no-version', 'backup package with version')
  .description('backup your global packages')
  .action(options => {
    // console.log(options.version);
    backupHandler({ version: options.version });
  });

backCmd
  .command('install')
  .alias('i')
  .description('install your backup')
  .option('-n --no-version', 'install package with version')
  .action(options => {
    installHandler({ version: options.version });
  });

backCmd.parse(process.argv);

if (!process.argv.slice(2).length) {
  backCmd.outputHelp();
  console.log();
  console.log(
    `You can run ${colors.yellow('bkg <command> -h')} or ${colors.yellow(
      'backup-global <command> --help',
    )} for help.`,
  );
  console.log();
}
