"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
/**
 * Get the stored value for the key. If default is set then that value will get returned in case that there isn't a value in the database.
 *
 * @param value The key to get from the database
 * @param defaultValue The default value if the key wasn't in the database
 */
function get(key, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getFull(key);
        if (result) {
            // check if the result is expired
            if (result.expires < new Date()) {
                // delete the expired key
                yield remove(key);
                return defaultValue;
            }
            return result.value;
        }
        return defaultValue;
    });
}
exports.get = get;
/**
 * Get the full storage object with date saved and expiry date.
 *
 * @param key the key string
 */
function getFull(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.keystore.get(key);
    });
}
exports.getFull = getFull;
/**
 * Save a value into the offline key-store database
 *
 * @param key The key to save in the database
 * @param value the value to store
 * @param expires The date that the value should expire in the database. This is set to 10 years by default
 */
function set(key, value, expires) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = {
            dateSaved: new Date(),
            expires: expires || new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
            key,
            value
        };
        // update the value in database
        yield database_1.db.keystore.put(object);
    });
}
exports.set = set;
/**
 * Delete a value from the indexed db
 *
 * @param key The key of the value to remove
 */
function remove(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.db.keystore.delete(key);
    });
}
exports.remove = remove;
//# sourceMappingURL=index.js.map