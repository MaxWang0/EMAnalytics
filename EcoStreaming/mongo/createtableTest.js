use mydb;

round = function (val,places) {
     var p={ };
     var divider=Math.pow(10,places);
     p["$divide"]=[];
     var newval={$add:[{"$multiply":[val,divider]},.5]};
     sub={"$subtract":[ newval, {"$mod":[newval, 1]} ]};
     p["$divide"].push(sub);
     p["$divide"].push(divider);
     return p;
}

      db.newtable.find().forEach(
          function (table) {
             db.ercotRTDtable.update({RTDTimestamp: table.IntervalEnding, RepeatedHourFlag: table.RepeatedHourFlag, IntervalRepeatedHourFlag: table.IntervalRepeatedHourFlag, SettlementPoint: table.SettlementPoint, SettlementPointType: table.SettlementPointType}, {$set: {LMPActual: table.LMP, SCEDTime: new Date(table.RTDTimestamp), IntervalTime: new Date(table.IntervalEnding)}}, {upsert:true})
      });

             db.ercotRTDtable.aggregate( [ { $project: { RTDTimestamp: 1, RepeatedHourFlag: 1, IntervalRepeatedHourFlag: 1, SettlementPoint: 1, SettlementPointType: 1, total: round({ $divide: [{$subtract: [ "$IntervalTime", "$SCEDTime"] }, 60000]}, 0)}}] ).forEach( 
          function (table) { 
             db.ercotRTDtable.update({RTDTimestamp: table.RTDTimestamp, SettlementPoint: table.SettlementPoint, SettlementPointType: table.SettlementPointType, IntervalRepeatedHourFlag: table.IntervalRepeatedHourFlag}, {$rename: {"LMPActual": "LMP"+new String(table.total)}}) 
      });








