"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const colors_1 = __importDefault(require("colors"));
const utils_1 = require("./utils");
const config_1 = require("./config");
function fileHandler() {
    const pathFile = config_1.DEFAULT_RECORD_FILE;
    if (!fs_1.default.existsSync(pathFile)) {
        utils_1.soloConsole.warn('Can not find records, use default config.');
        const pkgPath = config_1.DEFAULT_PKG_FILE;
        utils_1.wFile(pathFile, pkgPath, 'Finding ...').then(() => {
            utils_1.soloConsole.success(`Backup file: ${colors_1.default.blue(pkgPath)}`);
        });
    }
    else {
        utils_1.rFile(pathFile, 'Finding ...').then(pkgPath => {
            utils_1.soloConsole.success(`Backup file: ${colors_1.default.blue(pkgPath)}`);
        });
    }
}
exports.fileHandler = fileHandler;
