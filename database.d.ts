import { Dexie } from "dexie";
/**
 * the Keystore class to create the database
 */
declare class KeyStore extends Dexie {
    keystore: Dexie.Table<KeyStoreCols, string>;
    constructor();
}
/**
 * The primary table columns used
 */
export interface KeyStoreCols {
    key: string;
    value: any;
    dateSaved: Date;
    expires: Date;
}
export declare const db: KeyStore;
export {};
