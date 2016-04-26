Api.addRoute('web/schedule/retrieve', {authRequired: false}, {
    post: function() {
        var request 	         = this.request;
        var response 	         = this.response;
        var schedule = Schedule.find().fetch();
        return {
          statusCode: 200,
          body: {responseCode: 0, schedule: schedule}
        };
    }
});
