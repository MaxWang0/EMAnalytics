Api.addRoute('web/data/retrieve', {authRequired: false}, {
    post: function() {
        var request  = this.request;
        var response = this.response;
         //var list = BigData.find({}, {sort: {$natural : 1}, limit: 50}).fetch();
         var list = spindex.find({}).fetch();
         var list2 = Timeindex.find({}).fetch();
         var list3 = {
             list: list,
             list2:list2
         };

        var body = {
            list3: list3
        };
        return {
          statusCode: 200,
          body: body
        };
    }
});
// Router.route('api/mobile/home', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
