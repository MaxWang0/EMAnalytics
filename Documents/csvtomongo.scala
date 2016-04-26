//for saving the csv to mongodb in scala
import org.apache.spark.sql._
import sqlContext._
import com.mongodb.casbah.{WriteConcern => MongodbWriteConcern}
import com.stratio.datasource.mongodb._
import MongodbConfig._
val ercotdata = sc.textFile("/home/emotto_user2/testdata/cdr.00011485.0000000000000000.20160115.112014.LMPSELECTBUSNP6787_20160115_112011.csv")
case class X(SCEDTimestamp: String, RepeatedHourFlag: String, ElectricalBus: String, LMP: Double)
val header = ercotdata.first()
val data = ercotdata.filter(x => x != header)
val dataframe = data.map(_.split(",")).map(p => X(p(0).toString, p(1).toString, p(2).toString, p(3).toDouble)).toDF()
val saveConfig = MongodbConfigBuilder(Map(Host -> List("localhost:27017"), Database -> "Ercot1", Collection -> "BUS1", SamplingRatio -> 1.0, WriteConcern -> MongodbWriteConcern.Normal, SplitSize -> 8, SplitKey -> "_id"))
 dataframe.saveToMongodb(saveConfig.build)
