"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./utils");
const config_1 = require("./config");
const BackupPackages_1 = require("./backupCls/BackupPackages");
function backupYarnHandler(args, aboveText) {
    const bkyp = new BackupPackages_1.BackupYarnPackages(args.needVersion);
    const backupFile = args.backupFile;
    bkyp
        .getFullPackages()
        .then(pkgs => {
        const header = [
            aboveText,
            '',
            '',
            `# These are yarn packages under "${config_1.YARN_STATEMENT_HEADER}".`,
            config_1.YARN_STATEMENT_HEADER,
            '',
        ];
        const textList = header.concat(pkgs);
        return utils_1.wFile(backupFile, textList.join('\n'));
    })
        .then(() => {
        return utils_1.wFile(config_1.DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
        .then(() => utils_1.soloConsole.success(`Backup file: ${colors_1.default.blue(backupFile)}`))
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
function backupHandler(args) {
    let needYarn = false;
    if (config_1.HAS_YARN_ENV && args.needYarn) {
        needYarn = true;
    }
    if (!config_1.HAS_YARN_ENV && args.needYarn) {
        utils_1.soloConsole.warn(`You do ${colors_1.default.red('not')} have yarn, yarn packages will be ${colors_1.default.red('ignored')}!`);
    }
    const bkp = new BackupPackages_1.BackupPackages(args.needVersion);
    const backupFile = args.backupFile;
    let text = '';
    bkp
        .getFullPackages()
        .then(pkgs => {
        const commentHeader = [
            '# This is a comment, this line will be ignored.',
            '# You can use # to comment a line manually.',
            '',
        ];
        const textList = commentHeader.concat(pkgs);
        text = textList.join('\n');
        return utils_1.wFile(backupFile, text);
    })
        .then(() => {
        return utils_1.wFile(config_1.DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
        .then(() => utils_1.soloConsole.success(`Backup file: ${colors_1.default.blue(backupFile)}`))
        .then(() => {
        if (needYarn) {
            backupYarnHandler(args, text);
        }
    })
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
exports.backupHandler = backupHandler;
