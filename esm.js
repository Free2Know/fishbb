// esm.js
import { exports } from './sharedExports.js';

exports.forEach(({ key, path }) => {
    import(path).then(module => {
        Object.defineProperty(exports, key, {
            value: module[key],
            enumerable: true
        });
    });
});