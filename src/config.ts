import path from 'path';
import { getUserDir, hasYarn } from '@/utils';

const DEFAULT_PKG_FILE = path.join(getUserDir(), 'npm.global.txt');

const DEFAULT_RECORD_FILE = path.join(__dirname, '.pathrc');

const HAS_YARN_ENV = hasYarn();

const YARN_STATEMENT_HEADER = '[Yarn Global Packages]';

export { DEFAULT_PKG_FILE, DEFAULT_RECORD_FILE, HAS_YARN_ENV, YARN_STATEMENT_HEADER };
