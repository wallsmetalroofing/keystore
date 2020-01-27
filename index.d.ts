import { KeyStoreCols } from "./database";
/**
 * Get the stored value for the key. If default is set then that value will get returned in case that there isn't a value in the database.
 *
 * @param value The key to get from the database
 * @param defaultValue The default value if the key wasn't in the database
 */
export declare function get(key: string, defaultValue: any): Promise<any>;
/**
 * Get the full storage object with date saved and expiry date.
 *
 * @param key the key string
 */
export declare function getFull(key: string): Promise<KeyStoreCols | undefined>;
/**
 * Save a value into the offline key-store database
 *
 * @param key The key to save in the database
 * @param value the value to store
 * @param expires The date that the value should expire in the database. This is set to 10 years by default
 */
export declare function set(key: string, value: any, expires?: Date | number): Promise<void>;
/**
 * Delete a value from the indexed db
 *
 * @param key The key of the value to remove
 */
export declare function remove(key: string): Promise<void>;
