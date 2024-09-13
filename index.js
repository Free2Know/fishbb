// index.js
import { exports } from './sharedExports.js';

exports.forEach(({ key, path }) => {
    Object.defineProperty(exports, key, {
        get() {
            return require(path);
        },
        configurable: true
    });
});