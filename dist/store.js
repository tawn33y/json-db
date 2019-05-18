"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("./files");
exports.createStore = function (filePath, persistInterval) {
    if (persistInterval === void 0) { persistInterval = 2000; }
    return new Promise(function (resolve, reject) { return files_1.readJsonFile(filePath).then(function (data) {
        var state = __assign({}, data);
        var valueHasChanged = false;
        setInterval(function () {
            if (!valueHasChanged) {
                return;
            }
            files_1.writeJsonFile(filePath, state)
                .then(function () { return console.log('@@ store updated'); })
                .catch(function (err) { return console.log('!! store failed to updated', err); })
                .finally(function () { return valueHasChanged = false; });
        }, persistInterval);
        resolve({
            get: function (key) { return readFromStore(state, key); },
            set: function (key, data) {
                state = updateStore(state, key, data);
                valueHasChanged = true;
            },
            del: function (key) {
                state = deleteFromStore(state, key);
                valueHasChanged = true;
            },
        });
    }).catch(function (err) { return reject(err); }); });
};
var readFromStore = function (state, key) { return key === '*' ? state : state[key] || undefined; };
var updateStore = function (state, key, data) {
    var _a;
    return __assign({}, state, (_a = {}, _a[key] = data, _a));
};
var deleteFromStore = function (state, key) {
    if (key === '*') {
        return {};
    }
    else {
        return Object.keys(state)
            .filter(function (k) { return k !== key; })
            .reduce(function (acc, k) {
            acc[k] = state[k];
            return acc;
        }, {});
    }
    ;
};
//# sourceMappingURL=store.js.map