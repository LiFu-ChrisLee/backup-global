#!/usr/bin/env node

import backCmd from 'commander';

import program from './package.json';
import { backupHandler } from './src/backupHandler.js';
import { installHandler } from './src/installHandler.js';

backCmd.version(program.version);

backCmd
  .command('backup')
  .alias('b')
  .description('backup your global packages')
  .action(() => {
    backupHandler();
  });

backCmd
  .command('install')
  .alias('i')
  .description('install your backup')
  .action(() => {
    installHandler();
  });

backCmd.parse(process.argv);

if (!process.argv.slice(2).length) {
  backCmd.outputHelp();
}
