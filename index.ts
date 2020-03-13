#!/usr/bin/env node

import backCmd from 'commander';

import colors from 'colors';

import { soloConsole } from '@/utils';
import { backupHandler } from '@/backupHandler';
import { installHandler } from '@/installHandler';
import { fileHandler } from '@/fileHandler';
import { BackOptionsDto, InstallOptionsDto } from '@dto/Options.dto';
import program from './package.json';

backCmd.version(program.version).name('backup-global|bkg');

backCmd
  .command('backup')
  .alias('b')
  .option('-n --no-version', 'backup package with version')
  .description('backup your global packages')
  .action(agrvs => {
    const options: BackOptionsDto = { needVersion: agrvs.version };
    backupHandler(options);
  });

backCmd
  .command('install')
  .alias('i')
  .description('install your backup')
  .option('-n --no-version', 'install package with version')
  .action(agrvs => {
    const options: InstallOptionsDto = { needVersion: agrvs.version };
    installHandler(options);
  });

backCmd
  .command('file')
  .alias('f')
  .description('show your backup file path')
  .action(() => {
    fileHandler();
  });

backCmd.parse(process.argv);

if (!process.argv.slice(2).length) {
  backCmd.outputHelp();

  soloConsole.log(
    `You can run ${colors.yellow('bkg <command> -h')} or ${colors.yellow(
      'backup-global <command> --help',
    )} for help.`,
  );
}
