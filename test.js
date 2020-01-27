/* eslint-disable implicit-arrow-linebreak */
require("fake-indexeddb/auto");
// const assert = require("assert");
const keystore = require("./index");

describe("Key Store", function () {

    // save a value into indexed db
    it("should save values to database", function (done) {

        keystore.set("a", 1)
            .then(() => done());

    });

    // get a value from database and should be identical to the input value
    it("should get a value from database", function (done) {

        keystore.get("a", 2)
            .then(value => {
                if (value === 1) {
                    done();
                } else {
                    done(1);
                }
            })
            .catch(done);
    });

    // return a default value if not set in database
    it("should return default value", function (done) {
        keystore.get("b", 2)
            .then(value => {
                if (value === 2) {
                    done();
                } else {
                    done(1);
                }
            })
            .catch(done);
    });

    // should return the entire object of a saved item
    it("should return full object", function (done) {
        keystore.getFull("a")
            .then(value => {

                if (
                    value.key === "a" &&
                    value.value === 1 &&
                    value.dateSaved instanceof Date &&
                    value.expires instanceof Date &&
                    Object.keys(value).length === 4
                ) {
                    done();
                } else {
                    done(1);
                }

            })
            .catch(done);
    });

    // should respect expiry and not return a expired value
    it("should not return saved value if expired", function (done) {

        // save a new expired value
        keystore.set("b", 2, new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
            .then(() => {

                // get the value from indexeddb
                keystore.get("b", 3)
                    .then(value => {
                        if (value === 3) {
                            done();
                        } else {
                            done(1);
                        }
                    })
                    .catch(done);

            })
            .catch(done);

    });

    // should delete a value from database
    it("should delete a value from database", function (done) {
        // save a new value as 3
        keystore.set("c", 3, new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
            // delete the value from database
            .then(() => keystore.remove("c"))
            // get the value from indexed db to confirm that it's deleted
            .then(() => keystore.get("c", 4))
            .then(value => {
                if (value === 4) {
                    done();
                } else {
                    done(1);
                }
            })
            .catch(done);
    });
});