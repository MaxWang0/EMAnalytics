Meteor.publish('houses', function(username) {
    // console.log(username);
    check(username, String);
    return House.find({
        username: username
    });
});
