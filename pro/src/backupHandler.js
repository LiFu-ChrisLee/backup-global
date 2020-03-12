"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./utils");
const BackupPackages_1 = require("./backupCls/BackupPackages");
function backupHandler(args) {
    const bkp = new BackupPackages_1.BackupPackages(args.needVersion);
    const backupFile = path_1.default.join(utils_1.getUserDir(), 'npm.global.txt');
    bkp
        .getFullPackages()
        .then(pkgs => {
        const commentHeader = [
            '# This is a comment, this line will be ignore.',
            '# You can use # to comment a line manually.',
            '',
        ];
        const textList = commentHeader.concat(pkgs);
        return utils_1.wFile(backupFile, textList.join('\n'));
    })
        .then(() => {
        utils_1.soloConsole.success(`Backup file: ${colors_1.default.blue(backupFile)}`);
    })
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
exports.backupHandler = backupHandler;
