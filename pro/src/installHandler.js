"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./utils");
const config_1 = require("./config");
const InstallPackages_1 = require("./installCls/InstallPackages");
function installYarnHandler(args, text) {
    const backupFile = args.backupFile;
    const isyp = new InstallPackages_1.InstallYarnPackages(text, args.needVersion);
    isyp
        .installFullPackages()
        .then(data => {
        utils_1.soloConsole.success(colors_1.default.white(data));
    })
        .then(() => {
        return utils_1.wFile(config_1.DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
function installHandler(args) {
    let needYarn = false;
    if (config_1.HAS_YARN_ENV && args.needYarn) {
        needYarn = true;
    }
    if (!config_1.HAS_YARN_ENV && args.needYarn) {
        utils_1.soloConsole.warn(`You do ${colors_1.default.red('not')} have yarn, yarn packages will ${colors_1.default.red('not')} be installed!`);
    }
    const backupFile = args.backupFile;
    let text = '';
    utils_1.rFile(backupFile)
        .then(rText => {
        text = rText;
        const isp = new InstallPackages_1.InstallPackages(text, args.needVersion);
        return isp.installFullPackages();
    })
        .then(data => {
        utils_1.soloConsole.success(colors_1.default.white(data));
    })
        .then(() => {
        return utils_1.wFile(config_1.DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
        .then(() => {
        if (needYarn) {
            installYarnHandler(args, text);
        }
    })
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
exports.installHandler = installHandler;
