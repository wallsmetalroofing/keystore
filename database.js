"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dexie_1 = require("dexie");
/**
 * the Keystore class to create the database
 */
class KeyStore extends dexie_1.Dexie {
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