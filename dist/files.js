"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
exports.readJsonFile = function (path) { return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
        if (err) {
            reject(err);
            return;
        }
        try {
            var json = JSON.parse(data.toString());
            resolve(json);
        }
        catch (err2) {
            reject(err2);
        }
    });
}); };
exports.writeJsonFile = function (path, data) { return new Promise(function (resolve, reject) {
    var json = JSON.stringify(data);
    fs.writeFile(path, json, function (err) {
        if (err) {
            reject(err);
            return;
        }
        resolve();
    });
}); };
//# sourceMappingURL=files.js.map