//for saving parquet file to mongodb in scala
import org.apache.spark.sql.SQLContext._
import org.apache.spark.sql._
import sqlContext._
import com.mongodb.casbah.{WriteConcern => MongodbWriteConcern}
import com.stratio.datasource.mongodb._
import MongodbConfig._
object EA {
  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("EAanalytics")
    val spark = new SparkContext(conf)
    val parquetFile = sqlContext.read.parquet("students.parquet")
    val options = Map("host" -> "localhost:27017", "database" -> "highschool", "collection" -> "students"
)
    parquetFile.write.format("com.stratio.datasource.mongodb").mode(SaveMode.Append).options(options).sav
e()
    spark.stop()
 }
}

