#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const commander_1 = __importDefault(require("commander"));
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./src/utils");
const backupHandler_1 = require("./src/backupHandler");
const installHandler_1 = require("./src/installHandler");
const fileHandler_1 = require("./src/fileHandler");
const config_1 = require("./src/config");
const package_json_1 = __importDefault(require("./package.json"));
commander_1.default.version(package_json_1.default.version).name('backup-global|bkg');
commander_1.default
    .command('backup')
    .alias('b')
    .option('-n, --no-version', 'backup package with version')
    .option('-o, --output <filePath>', 'backup to custom file')
    .description('backup your global packages')
    .action(agrvs => {
    let backupFile = config_1.DEFAULT_PKG_FILE;
    if (agrvs.output) {
        backupFile = path_1.default.resolve(process.cwd(), agrvs.output);
    }
    const options = {
        needVersion: agrvs.version,
        backupFile,
    };
    backupHandler_1.backupHandler(options);
});
commander_1.default
    .command('install')
    .alias('i')
    .description('install your backup')
    .option('-n, --no-version', 'install package with version')
    .option('-i, --input <filePath>', 'use custom backup file')
    .action(agrvs => {
    let backupFile = config_1.DEFAULT_PKG_FILE;
    if (agrvs.input) {
        backupFile = path_1.default.resolve(process.cwd(), agrvs.input);
    }
    const options = {
        needVersion: agrvs.version,
        backupFile,
    };
    installHandler_1.installHandler(options);
});
commander_1.default
    .command('file')
    .alias('f')
    .description('show your backup file path')
    .action(() => {
    fileHandler_1.fileHandler();
});
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
    utils_1.soloConsole.log(`You can run ${colors_1.default.yellow('bkg <command> -h')} or ${colors_1.default.yellow('backup-global <command> --help')} for help.`);
}
