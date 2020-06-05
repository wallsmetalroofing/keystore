import Dexie from "dexie";


/**
 * the Keystore class to create the database
 */
class KeyStore extends Dexie {
    keystore: Dexie.Table<KeyStoreCols, string>;

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

/**
 * The primary table columns used
 */
export interface KeyStoreCols {
    key: string,
    value: any,
    dateSaved: Date,
    expires: Date,
}

// create the new KeyStore database
export const db = new KeyStore();

db.open()
    .catch(err => {
        // Failed to open the database
        console.error(err);
    });