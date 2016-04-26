use mydb;


      db.spindex.find().forEach(
          function (table) {
             var name = "SettlementPoint"
             var obj = {}
             obj[name] = table.index
             db.newtable2.update({SettlementPoint: table.settlementpoint}, {$set: obj}, {multi: true})
 });
       
      db.sptindex.find().forEach(
          function (table) {
             var name = "SettlementPointType"
             var obj = {}
             obj[name] = table.index
             db.newtable2.update({SettlementPointType: table.Type}, {$set: obj}, {multi: true})
 });

      db.newtable2.find().forEach(
          function (table) {
             var diff = Math.round(new Date(table.IntervalEnding)/60000 - new Date(table.RTDTimestamp)/60000)
             var name = "LMP"+new String(diff)
             var obj = {}
             obj[name] = table.LMP
             db.ercotRTDtable.update({RTDTimestamp: table.IntervalEnding, RepeatedHourFlag: table.RepeatedHourFlag, IntervalRepeatedHourFlag: table.IntervalRepeatedHourFlag, SettlementPoint: table.SettlementPoint, SettlementPointType: table.SettlementPointType}, {$set: obj}, {upsert:true})
 });

      


      db.newtable2.remove({})

