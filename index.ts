import { db, KeyStoreCols } from "./database";

/**
 * Get the stored value for the key. If default is set then that value will get returned in case that there isn't a value in the database.
 * 
 * @param value The key to get from the database
 * @param defaultValue The default value if the key wasn't in the database
 */
export async function get(key: string, defaultValue: any) {

    const result = await getFull(key);
    if (result) {

        // check if the result is expired
        if (result.expires < new Date()) {
            // delete the expired key
            await remove(key);
            return defaultValue;
        }

        return result.value;
    }

    return defaultValue;
}

/**
 * Get the full storage object with date saved and expiry date. 
 * 
 * @param key the key string
 */
export async function getFull(key: string) {
    return await db.keystore.get(key);
}

/**
 * Save a value into the offline key-store database
 * 
 * @param key The key to save in the database
 * @param value the value to store
 * @param expires The date that the value should expire in the database. This is set to 10 years by default
 */
export async function set(key: string, value: any, expires?: Date | number) {

    if (typeof expires === "number") {
        // get the hours number
        const h = expires;

        // create a new Date instance
        expires = new Date();
        expires.setTime(expires.getTime() + (h * 60 * 60 * 1000));

    } else if (!expires) {
        // if not set the default to 1 year
        expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
    }

    const object: KeyStoreCols = {
        dateSaved: new Date(),
        expires: expires,
        key,
        value
    };

    // update the value in database
    await db.keystore.put(object);
}


/**
 * Delete a value from the indexed db
 * 
 * @param key The key of the value to remove
 */
export async function remove(key: string) {
    await db.keystore.delete(key);
}