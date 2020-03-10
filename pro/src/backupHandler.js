"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var node_cmd_1 = __importDefault(require("node-cmd"));
var ora_1 = __importDefault(require("ora"));
var utils_1 = require("./utils");
function wFile(data) {
    var writeFileSpinner = ora_1.default('Writing backup file ...');
    writeFileSpinner.start('');
    var dataArr = data.split('\n');
    var backupFile = path_1.default.join(utils_1.getUserDir(), 'npm.global.txt');
    var packages = [];
    dataArr.forEach(function (item, i) {
        if (i !== 0 && item !== '') {
            packages.push(item.replace(/(.:)|(\\[^@]*\\)|(\/[^@]*\/)/g, '').replace(/\\/g, '/'));
        }
    });
    fs_1.default.writeFile(backupFile, packages.join('\n'), function (wFileErr) {
        if (wFileErr) {
            writeFileSpinner.fail('');
            console.error('Writing file error: ', wFileErr);
        }
        else {
            writeFileSpinner.succeed('');
            console.log("Backup file: " + backupFile);
        }
    });
}
function backupHandler() {
    var getPackageSpinner = ora_1.default('Getting global packages ...');
    getPackageSpinner.start('');
    node_cmd_1.default.get('npm list --global --parseable --depth=0', function (err, data, stderr) {
        getPackageSpinner.succeed('');
        if (data) {
            wFile(data);
        }
        else if (stderr) {
            console.error('std error: ', stderr);
        }
        else {
            console.error('cmd error: ', err);
        }
    });
}
exports.backupHandler = backupHandler;
