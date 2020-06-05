"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dexie_1 = __importDefault(require("dexie"));
/**
 * the Keystore class to create the database
 */
class KeyStore extends dexie_1.default {
    constructor() {
        // update a Dexie object
        super("key-store");
        // setup the table
        this.version(1)
            .stores({
            keystore: "key,value,dateSaved,expires",
        });
        // tell typescript that we aren't stupid when calling the keystore
        this.keystore = this.table("keystore");
    }
}
// create the new KeyStore database
exports.db = new KeyStore();
exports.db.open()
    .catch(err => {
    // Failed to open the database
    console.error(err);
});
//# sourceMappingURL=database.js.map