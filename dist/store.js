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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("./files");
var readFromStore = function (state, key) { return (key === '*' ? state : state[key] || undefined); };
var updateStore = function (state, key, data) {
    var _a;
    return (__assign(__assign({}, state), (_a = {}, _a[key] = data, _a)));
};
var deleteFromStore = function (state, key) {
    if (key === '*')
        return {};
    var _a = state, _b = key, deletedKey = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    return rest;
};
exports.createStore = function (filePath, persistInterval) {
    if (persistInterval === void 0) { persistInterval = 2000; }
    return new Promise(function (resolve, reject) { return files_1.readJsonFile(filePath).then(function (data) {
        var state = __assign({}, data);
        var valueHasChanged = false;
        setInterval(function () {
            if (!valueHasChanged)
                return;
            files_1.writeJsonFile(filePath, state)
                .then(function () { return console.log('[✔️] store updated'); })
                .catch(function (err) { return console.log('[ERR] store failed to updated', err); })
                .finally(function () {
                valueHasChanged = false;
            });
        }, persistInterval);
        resolve({
            get: function (key) { return readFromStore(state, key); },
            set: function (key, newData) {
                state = updateStore(state, key, newData);
                valueHasChanged = true;
            },
            del: function (key) {
                state = deleteFromStore(state, key);
                valueHasChanged = true;
            },
        });
    }).catch(function (err) { return reject(err); }); });
};
//# sourceMappingURL=store.js.map