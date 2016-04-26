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

      db.ercotRTDtable.ensureIndex({RTS: 1}, {SP: 1}, {SPT: 1}, {IRHF: 1})

      
      db.newtable2.find().forEach(
          function (table) {
             var diff = Math.round(new Date(table.IntervalEnding)/60000 - new Date(table.RTDTimestamp)/60000)
             var name = "LMP"+new String(diff)
             var obj = {}
             obj[name] = table.LMP
             db.ercotRTDtable.update({RTS: table.IntervalEnding,  SP: table.SettlementPoint, SPT: table.SettlementPointType, IRHF: table.IntervalRepeatedHourFlag}, {$set: obj}, {upsert:true})
 });

      


      db.newtable2.remove({})

