Api.addRoute('web/schedule/update', {authRequired: false}, {
    post: function() {
        var req 	         = this.request;
        var res 	         = this.response;
        var username = req.body.username;
        var session  = req.body.session;
        var schedule = req.body.schedule;
        var macAddress = schedule.macAddress;
        var scheduleMap = {
            // scheduleId: "aabbccdd",
            // macAddress: macAddress,
            creationDate: new Date(), //schedule.creationDate,
            modifiedDate: new Date(), //schedule.modifiedDate,
            date: schedule.date,
            startTime: schedule.startTime,
            coolTemperature: schedule.coolTemperature,
            heatTemperature: schedule.heatTemperature,
            cycleTemperature: schedule.cycleTemperature
        };

        try {
            Schedule.update({
                macAddress: macAddress
            },{
                $set: scheduleMap
            });
        }
        catch (err) {
            console.log(err);

            return {
              statusCode: 200,
              body: 'Unsuccessfully create Schedule!'
            };
        }

        var body = {
            responseCode: ResponseCodes.SUCCESS,
            username: username,
            session     : session,
            schedule     : scheduleMap
        };
        return {
          statusCode: 200,
          body: body
        };


    }
});
