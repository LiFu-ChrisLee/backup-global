#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var package_json_1 = __importDefault(require("./package.json"));
var backupHandler_js_1 = require("./src/backupHandler.js");
var installHandler_js_1 = require("./src/installHandler.js");
commander_1.default.version(package_json_1.default.version);
commander_1.default
    .command('backup')
    .alias('b')
    .description('backup your global packages')
    .action(function () {
    backupHandler_js_1.backupHandler();
});
commander_1.default
    .command('install')
    .alias('i')
    .description('install your backup')
    .action(function () {
    installHandler_js_1.installHandler();
});
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
//# sourceMappingURL=index.js.map