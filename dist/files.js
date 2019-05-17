"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.readJsonFile = function (path) { return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
        if (err) {
            return reject(err);
        }
        try {
            var json = JSON.parse(data.toString());
            resolve(json);
        }
        catch (err) {
            return reject(err);
        }
    });
}); };
exports.writeJsonFile = function (path, data) { return new Promise(function (resolve, reject) {
    var json = JSON.stringify(data);
    fs.writeFile(path, json, function (err) {
        if (err) {
            return reject(err);
        }
        resolve();
    });
}); };
//# sourceMappingURL=files.js.map