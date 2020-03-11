"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./utils");
const InstallPackages_1 = require("./installCls/InstallPackages");
function installHandler(args) {
    const backupFile = path_1.default.join(utils_1.getUserDir(), 'npm.global.txt');
    utils_1.rFile(backupFile)
        .then(text => {
        const isp = new InstallPackages_1.InstallPackages(text, args.needVersion);
        return isp.installFullPackages();
    })
        .then(data => {
        utils_1.soloConsole.success(colors_1.default.white(data));
    })
        .catch(e => {
        utils_1.soloConsole.error(e);
    });
}
exports.installHandler = installHandler;
