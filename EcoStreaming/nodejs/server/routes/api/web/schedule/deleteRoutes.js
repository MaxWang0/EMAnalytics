Api.addRoute('web/schedule/delete', {authRequired: false}, {
    post: function() {
        var req 	         = this.request;
        var res 	         = this.response;

        var username = req.body.username;
        var session = req.body.session;
        var scheduleId = req.body.scheduleId;

        var checkIfExisted = Schedule.findOne({
            scheduleId: scheduleId
        });

        if (checkIfExisted) {
            try {
                Schedule.remove({
                    scheduleId: scheduleId
                });
            }
            catch (err) {
                console.log(err);
            }
        }

        var body = {
            responseCode: ResponseCodes.SUCCESS,
            username: username,
            session     : session//,
            // schedule     : scheduleMap
        };
        return {
          statusCode: 200,
          body: body
        };
    }
});
