use mydb;

      db.newtable.find().forEach(
          function (table) {
             var diff = Math.round(new Date(table.IntervalEnding)/60000 - new Date(table.RTDTimestamp)/60000)
             var name = "LMP"+new String(diff)
             var obj = {}
             obj[name] = table.LMP
             // table.update({}, {$rename: {"LMP": name}})
             db.ercotRTDtable.update({RTDTimestamp: table.IntervalEnding, RepeatedHourFlag: table.RepeatedHourFlag, IntervalRepeatedHourFlag: table.IntervalRepeatedHourFlag, SettlementPoint: table.SettlementPoint, SettlementPointType: table.SettlementPointType}, {$set: obj}, {upsert:true})
             /** db.ercotRTDtable.update({RTDTimestamp: table.IntervalEnding, SettlementPoint: table.SettlementPoint, SettlementPointType: table.SettlementPointType, IntervalRepeatedHourFlag: table.IntervalRepeatedHourFlag}, {$rename: {"LMPActual": "LMP"+new String(diff)}})     
**/
 });

      db.newtable.remove({})

