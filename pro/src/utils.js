"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserDir() {
    var dirEnv = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
    return process.env[dirEnv];
}
exports.getUserDir = getUserDir;
