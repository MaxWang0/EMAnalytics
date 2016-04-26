// function loadFixture(fixtures, collection) {
//     var i;
//
//     for (i = 0; i < fixtures.length; i += 1) {
//         //collection.remove({ });
//         collection.insert(fixtures[i]);
//     }
// }
//
Meteor.startup(function() {
    //loadFixture(Fixtures['dummyFixture'], DummyCollection);
    Registration.remove({});
    Registration.insert({
        gcmId: 'APA91bGelE9_w8q5u3-vP9tuOrMMcCSUwxNPQEUOPT_sAzJHXffp0sPcSVU01OgLioD_feE5_ZqhSzxQAL0qJhtEYYACUrDcCQ6JgeRByobB5LFv6SsRPdpaSqKCuv4PC_6HSmJSylYi',
        username: 'quang',
        session: 'session_quang'
    });

    Customer.remove({});
    Customer.insert({
        username: 'quang',
        password: '123456',
        email: 'A',
        scale: 'C',
        creationDate: new Date(),
        modifiedDate: new Date(),
        firstname: "Duc",
        lastname: "Do",
        streetAddress: "5426 Meadowcreek Dr",
        city: "Dallas",
        state: "TX",
        zipcode: "75248",
        timezone: "CST",
        phone: "123445422"
    });

    House.remove({});
    House.insert({
        houseId: "test_house",
        username: "quang",
        name: " quang_house",
        creationDate: "2015-11-30T21:07:47.860Z",
        modifiedDate: "2015-11-30T21:07:47.860Z",
        streetAddress: "5426 Meadowcreek Dr",
        city: "Dallas",
        state: "TX",
        zipcode: "75248",
        timezone: "CST"
    });

    // Remove all previous data
    Thermostat.remove({});
    DeviceSession.remove({});
    // RegistrationKey.remove({});
    Schedule.remove({});

    /* Uncommenting this block out for testing */
    /* Commenting this block out for production */
    BigData.remove({});
    BigData.insert({
        "settlementpoint" : "AEEC",
        "settlementpointtype" : "RN",
        "intend" : "2016/01/1 00:05:00",
        "intervalrepeatedhourflag" : "N",
        "lmp5" : 17.71,
        "lmp10" : "",
        "lmp15" : "",
        "lmp20" : "",
        "lmp25" : "",
        "lmp30" : "",
        "lmp35" : "",
        "lmp40" : "",
        "lmp45" : "",
        "lmp50" : "",
        "lmp55" : ""
    });


    BigData.insert({"settlementpoint" : "AEEC", "settlementpointtype" : "RN", "intend" : "2016/01/1 00:07:00", "intervalrepeatedhourflag" : "N", "lmp5" : 34, "lmp10" : 17.44, "lmp15" : "", "lmp20" : "", "lmp25" : "",
    "lmp30" : "", "lmp35" : "", "lmp40" : "", "lmp45" : "", "lmp50" : "", "lmp55" : "" });
    BigData.insert({"settlementpoint" : "AEEC", "settlementpointtype" : "RN", "intend" : "2016/01/1 00:08:00", "intervalrepeatedhourflag" : "N", "lmp5" : 32, "lmp10" : 17.71, "lmp15" : 17.32, "lmp20" : "", "lmp25" : "",
    "lmp30" : "", "lmp35" : "", "lmp40" : "", "lmp45" : "", "lmp50" : "", "lmp55" : "" });

});
