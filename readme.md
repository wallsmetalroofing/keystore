
# @walls/key

store

Creates a dexie indexed database as a simple keystore.

    const keystore = require("@walls/keystore");

## .get
    
   Get the value from the database for the given key. If the key is not in the database then the default value is returned instead.
   
    const result = await keystore.get("key", "if not exists value");

## .set

Set any value with the corresponding key and save it in the database. Optionally add a expirery date to when that given value should expire. If the value is expired then the default value is given when calling with `.get`

    await keystore.set("key", value to store, ExpiryDate);
    
## .getFull

Gets the full object that is saved in the database. This includes the date that it was last updated/saved and it's expirery date.
	
	await keystore.getFull("key");

## .remove
Removes the given key path from the database. This will resolve if the value was there before or not.
    
    await keystore.remove("key")	

> Written with [StackEdit](https://stackedit.io/).