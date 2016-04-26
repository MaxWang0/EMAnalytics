import org.apache.spark.sql._
import sqlContext._
import com.mongodb.casbah.{WriteConcern => MongodbWriteConcern}
import com.stratio.datasource.mongodb._
import MongodbConfig._
import com.stratio.datasource._
import com.stratio.datasource.mongodb._
import com.stratio.datasource.mongodb.schema._
import com.stratio.datasource.mongodb.writer._
import org.apache.spark.sql.SQLContext
import org.apache.spark.sql.types.DateType
import org.apache.spark.sql.functions._
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import sys.process._

import org.apache.spark.sql.types.DateType
import org.apache.spark.sql.functions._
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import sys.process._

import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream


//create sample table and save to mongodb
/***
case class RTD(RTDTimestamp: String, RepeatedHourFlag: String, IntervalRepeatedHourFlag: String, SettlementPoint: String, SettlementPointType: String, LMP55: String, LMP50: String, LMP45: String, LMP40: String, LMP35: String, LMP30: String, LMP25: String, LMP20: String, LMP15: String, LMP10: String, LMP05: String, LMPActual: String)
val dataFrame: DataFrame = createDataFrame(sc.parallelize(List(RTD("01/25/2016 09:25:00", "N", "N", "AEEC", "RN", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"))))
val saveConfig = MongodbConfigBuilder(Map(Host -> List("localhost:27017"), Database -> "ercotdata", Collection ->"ercotRTDtable", SamplingRatio -> 1.0, WriteConcern -> MongodbWriteConcern.Normal, SplitSize -> 8, SplitKey -> "_id"))
dataFrame.saveToMongodb(saveConfig.build)
***/

//read table from mongodb
val builder = MongodbConfigBuilder(Map(Host -> List("localhost:27017"), Database -> "ercotdata", Collection ->"ercotRTDtable", SamplingRatio -> 1.0, WriteConcern -> "normal"))
val readConfig = builder.build()
val mongoRDD = sqlContext.fromMongoDB(readConfig)
mongoRDD.registerTempTable("ercot")
val accutable = sqlContext.sql("SELECT * FROM ercot")
var newaccutable = accutable.drop("_id")
newaccutable.registerTempTable("ercot")
var newaccutablelist = newaccutable.collect

//read new table from new csv file
val ercotdata = sc.textFile("/home/emotto_user2/JavaTextMining6/data/testRTD/cdr.00013073.0000000000000000.20160125.085513.RTDLMPRNLZHUBNP6970_20160125_085501.csv")
case class RTD(RTDTimeStamp: String, RepeatedHourFlag: String, IntervalId: String, IntervalEnding: String, IntervalRepeatedHourFlag: String, SettlementPoint: String, SettlementPointType: String, LMP: String)
val header = ercotdata.first()
val data = ercotdata.filter(x => x != header)
val dataframe = data.map(_.split(",")).map(p => RTD(p(0).toString, p(1).toString, p(2).toString, p(3).toString, p(4).toString, p(5).toString, p(6).toString, p(7).toString)).toDF()
dataframe.registerTempTable("csv")
val newtable = sqlContext.sql("SELECT * FROM csv")
var updatedTable = newtable.collect
val SCEDtime = dataframe.select("RTDTimeStamp").rdd.map(r => r(0)).first().toString()
val Timestamplist = dataframe.select("IntervalEnding").rdd.map(r => r(0)).distinct.collect()
val formatter = DateTimeFormat.forPattern("mm/dd/yyyy' 'kk:mm:ss")
var LMParray = Array("LMP05", "LMP10", "LMP15", "LMP20", "LMP25", "LMP30", "LMP35", "LMP40", "LMP45", "LMP50", "LMP55")

def roundUp(d: Double) = math.round(d).toInt

case class newlmp(LMP35: String, RTDTimestamp: String, SettlementPointType: String, LMP05: String, LMPActual: String, LMP55: String, LMP50: String, LMP25: String, SettlementPoint: String, IntervalRepeatedHourFlag: String, LMP20: String, RepeatedHourFlag: String, LMP10: String, LMP30: String, LMP40: String, LMP45: String, LMP15: String, make: String)
for( i <- Timestamplist ){
    println(i)
    val temp = newaccutable.filter(newaccutable("RTDTimestamp") === i.toString)
    var re = temp.count
    //val temp = sqlContext.sql(s"""SELECT * FROM ercot WHERE RTDTimestamp = "$i"""")
    //var re = temp.collect().length
    var timeDiff = formatter.parseDateTime( i.toString ).getMillis()/60000 - formatter.parseDateTime( SCEDtime ).getMillis()/60000
    var index = roundUp(timeDiff/5.0)
  
    var targetColumn = LMParray(index-1)
    val insertTable = newtable.filter(newtable("IntervalEnding") === i.toString)
    val insertColumn = insertTable.select("IntervalEnding", "RepeatedHourFlag", "IntervalRepeatedHourFlag", "SettlementPoint", "SettlementPointType", "LMP")
    val newInsertColumn = insertColumn.withColumn("IntervalEnding1", insertColumn("IntervalEnding")).withColumn("RepeatedHourFlag1", insertColumn("RepeatedHourFlag"))
    val newInsertColumn1 = newInsertColumn.withColumn("IntervalRepeatedHourFlag1", insertColumn("IntervalRepeatedHourFlag")).withColumn("SettlementPoint1", insertColumn("SettlementPoint"))
    val newInsertColumn2 = newInsertColumn1.withColumn("SettlementPointType1", insertColumn("SettlementPointType")).withColumn("LMP1", insertColumn("LMP"))
    val newInsertColumn3 = newInsertColumn2.withColumn("IntervalEnding", insertColumn("IntervalEnding")+1).withColumnRenamed("IntervalEnding", "LMP35")
    val newInsertColumn4 = newInsertColumn3.withColumn("RepeatedHourFlag", newInsertColumn3("IntervalEnding1")).withColumnRenamed("RepeatedHourFlag", "RTDTimestamp")
    val newInsertColumn5 = newInsertColumn4.withColumn("SettlementPointType", newInsertColumn4("RTDTimestamp")+1).withColumnRenamed("SettlementPointType", "LMPActual")
    val newInsertColumn6 = newInsertColumn5.withColumn("SettlementPoint", newInsertColumn5("RTDTimestamp")+1).withColumnRenamed("SettlementPoint", "LMP05")
    val newInsertColumn7 = newInsertColumn6.withColumn("IntervalRepeatedHourFlag", newInsertColumn6("SettlementPointType1")).withColumnRenamed("IntervalRepeatedHourFlag", "SettlementPointType")
    val newInsertColumn8 = newInsertColumn7.withColumn("LMP", newInsertColumn7("RTDTimestamp")+1).withColumnRenamed("LMP", "LMP55")
    val newInsertColumn9 = newInsertColumn8.withColumn("LMP50", newInsertColumn8("RTDTimestamp")+1).withColumn("LMP25", newInsertColumn8("RTDTimestamp")+1).withColumn("SettlementPoint", newInsertColumn8("SettlementPoint1"))
    val newInsertColumn10 = newInsertColumn9.withColumn("IntervalRepeatedHourFlag", newInsertColumn9("IntervalRepeatedHourFlag1"))
    val newInsertColumn11 = newInsertColumn10.withColumn("LMP20", newInsertColumn10("RTDTimestamp")+1).withColumn("RepeatedHourFlag", newInsertColumn10("RepeatedHourFlag1")).withColumn("LMP10", newInsertColumn10("RTDTimestamp")+1)
    val newInsertColumn12 = newInsertColumn11.withColumn("LMP30", newInsertColumn11("RTDTimestamp")+1).withColumn("LMP40", newInsertColumn11("RTDTimestamp")+1).withColumn("LMP45", newInsertColumn11("RTDTimestamp")+1)
    val newInsertColumn13 = newInsertColumn12.withColumn("LMP15", newInsertColumn12("RTDTimestamp")+1).withColumn(targetColumn, newInsertColumn12("LMP1"))
    val newInsertColumn14 = newInsertColumn13.drop("IntervalEnding1").drop("SettlementPointType1").drop("RepeatedHourFlag1").drop("IntervalRepeatedHourFlag1").drop("SettlementPoint1").drop("LMP1")


    if(re == 0){
         newaccutable = newInsertColumn14.unionAll(newaccutable)    
    
    }else{
    
         newInsertColumn14.registerTempTable("updatetable")
         val settle = newInsertColumn14.select("SettlementPoint").rdd.map(r => r(0)).collect()
         val settleType = newInsertColumn14.select("SettlementPointType").rdd.map(r => r(0)).collect()
         val IntervalRepeatedHourFlag = newInsertColumn14.select("IntervalRepeatedHourFlag").rdd.map(r => r(0)).collect()
         val RepeatedHourFlag = newInsertColumn14.select("RepeatedHourFlag").rdd.map(r => r(0)).collect()
         def datesBetween(startDate: String, endDate: String, j: Int, UpdateLMP: String): Array[org.apache.spark.sql.Row] = {
                    val settleIndex = settle(j).toString()
                    val settleTypeIndex = settleType(j).toString()
                    val InterFlag = IntervalRepeatedHourFlag(j).toString()
                    val RepeatFlag = RepeatedHourFlag(j).toString()
                    var timeDiff = formatter.parseDateTime( endDate ).getMillis()/60000 - formatter.parseDateTime( startDate ).getMillis()/60000
                    var index = roundUp(timeDiff/5.0)
                    var targetColumn = LMParray(index-1)
                    val colnames = newaccutable.columns
                    val indexOfLmp = colnames indexOf targetColumn
                    val indexOfRTDTimestamp = colnames indexOf "RTDTimestamp"
                    val indexOfSPT = colnames indexOf "SettlementPointType"
                    val indexOfSP = colnames indexOf "SettlementPoint"
                    val indexOfIRHF = colnames indexOf "IntervalRepeatedHourFlag"
                    val indexOfRHF = colnames indexOf "RepeatedHourFlag"
                    val array = newaccutable.map(row => {
                                   val RTDTimestamp = row.getAs[String](indexOfRTDTimestamp)
                                   val SettlementPointType = row.getAs[String](indexOfSPT)
                                   val SettlementPoint = row.getAs[String](indexOfSP)
                                   val RepeatedHourFlag = row.getAs[String](indexOfRHF)
                                   val IntervalRepeatedHourFlag = row.getAs[String](indexOfIRHF)
                                   val make = if (RTDTimestamp == endDate && SettlementPoint == settleIndex) UpdateLMP else row.getAs[String](index)
                                   Row(row.getAs[String](0), row.getAs[String](1), row.getAs[String](2), row.getAs[String](3), row.getAs[String](4), row.getAs[String](5), row.getAs[String](6), row.getAs[String](7), row.getAs[String](8), row.getAs[String](9), row.getAs[String](10), row.getAs[String](11), row.getAs[String](12), row.getAs[String](13), row.getAs[String](14), row.getAs[String](15), row.getAs[String](16), make)
                                   //Row(make)
                               }).collect()
                                   array
                   }               
    for(j <- 0 to settle.length-1){
        println(j)
        val settleIndex = settle(j).toString()
        val settleTypeIndex = settleType(j).toString()
        val InterFlag = IntervalRepeatedHourFlag(j).toString()
        val RepeatFlag = RepeatedHourFlag(j).toString()
        val temp2 = temp.filter( temp("SettlementPoint") === settleIndex && temp("SettlementPointType") === settleTypeIndex && temp("RepeatedHourFlag") === RepeatFlag && temp("IntervalRepeatedHourFlag") === InterFlag)
        // val temp = sqlContext.sql(s"""SELECT * FROM ercot WHERE SettlementPoint = "$settleIndex" AND SettlementPointType = "$settleTypeIndex" AND RepeatedHourFlag = "$RepeatFlag" AND IntervalRepeatedHourFlag = "$InterFlag"""")
        var ret = temp2.count
        if(ret == 0){
           val temp3 = newInsertColumn14.filter( newInsertColumn14("SettlementPoint") === settleIndex && newInsertColumn14("RTDTimestamp") === i )
           //val temp2 = sqlContext.sql(s"""SELECT * FROM updatetable WHERE SettlementPoint = "$settleIndex"  AND RTDTimestamp = "$i"""")
           newaccutable = temp2.unionAll(newaccutable)
        }else{
           val temp3 = newInsertColumn14.filter( newInsertColumn14("SettlementPoint") === settleIndex && newInsertColumn14("RTDTimestamp") === i )
           //val temp2 = sqlContext.sql(s"""SELECT * FROM updatetable WHERE SettlementPoint = "$settleIndex" AND RTDTimestamp = "$i"""")
           val UpdateLMP = temp2.select(targetColumn).rdd.map(r => r(0)).collect()(0).toString()
           updatedTable = datesBetween(SCEDtime, i.toString, j, UpdateLMP)
           //val newaccutablelist2 = newaccutable.collect.zip(updatedTable)
           newaccutable = sc.parallelize(updatedTable).map(p => newlmp(p(0).toString, p(1).toString, p(2).toString, p(3).toString, p(4).toString, p(5).toString, p(6).toString, p(7).toString, p(8).toString, p(9).toString, p(10).toString, p(11).toString, p(12).toString, p(13).toString, p(14).toString, p(15).toString, p(16).toString, p(17).toString)).toDF()
           
           newaccutable = newaccutable.withColumn(targetColumn, newaccutable("make")).drop("make")
           println(i)
           println(j)
        }
        println(j)
        //sc.parallelize(newaccutablelist2).saveAsTextFile("testdataframe")
    }  
       
  }
  //sc.parallelize(newaccutable.collect).saveAsTextFile("testdataframe")

  //val saveConfig = MongodbConfigBuilder(Map(Host -> List("localhost:27017"), Database -> "ercotdata", Collection -> "test2", SamplingRatio -> 1.0, WriteConcern -> MongodbWriteConcern.Normal, SplitSize -> 8, SplitKey -> "_id"))
  //newaccutable.saveToMongodb(saveConfig.build)
}
sc.parallelize(newaccutable).saveAsTextFile("testdataframe")
val newaccutable = sc.textFile("testdataframe")
newaccutable = sc.parallelize(updatedTable).map(p => newlmp(p(0).toString, p(1).toString, p(2).toString, p(3).toString, p(4).toString, p(5).toString, p(6).toString, p(7).toString, p(8).toString, p(9).toString, p(10).toString, p(11).toString, p(12).toString, p(13).toString, p(14).toString, p(15).toString, p(16).toString, p(17).toString)).toDF()
newaccutable = newaccutable.withColumn(targetColumn, temptable("make")).drop("make")

val saveConfig = MongodbConfigBuilder(Map(Host -> List("localhost:27017"), Database -> "ercotdata", Collection -> "test1", SamplingRatio -> 1.0, WriteConcern -> MongodbWriteConcern.Normal, SplitSize -> 8, SplitKey -> "_id"))
newaccutable.saveToMongodb(saveConfig.build)
