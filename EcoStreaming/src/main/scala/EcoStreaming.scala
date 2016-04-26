
import java.io.{FileOutputStream, ObjectOutputStream}

import kafka.serializer.StringDecoder
import org.apache.spark.mllib.linalg.{Vector, Vectors}
import org.apache.spark.mllib.optimization.{LBFGS, LeastSquaresGradient, SimpleUpdater}
import org.apache.spark.mllib.regression.LinearRegressionModel
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.spark.{SparkConf, SparkContext}
import org.joda.time.DateTime

import scala.collection.mutable.ArrayBuffer

/*
import com.github.nscala_time.time.Imports._
import kafka.serializer.StringDecoder
import org.apache.commons.io.Charsets
import org.apache.spark.SparkContext
import org.apache.spark.rdd.RDD
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.spark.streaming.{Seconds, StreamingContext}
import reactivemongo.api._
import reactivemongo.api.collections.default.BSONCollection
import reactivemongo.bson._
import MongoConversions._
import scala.concurrent.ExecutionContext.Implicits.global
 */

/**
 * Created by ecomotto on 3/6/15.
 */
//import com.twitter.algebird.HyperLogLogMonoid
//import MongoConversions._

object EcoStreaming extends App {

  //def main(args: Array[String]) = {
  val BatchDuration = Seconds(1)
  val conf = new SparkConf()
    .setMaster("local[4]")
    .setAppName("EcoStreaming")
    .set("spark.executor.memory", "1g")
    .set("spark.rdd.compress", "true")
    .set("spark.storage.memoryFraction", "1")
  val sparkContext = new SparkContext(conf)
  val streamingContext = new StreamingContext(sparkContext, BatchDuration)
  val kafkaParams = Map(
    "zookeeper.connect" -> "localhost:2181",
    "zookeeper.connection.timeout.ms" -> "10000",
    "group.id" -> "myGroup"
  )
  val topics = Map(
    Constants.KafkaTopic -> 1
  )
  //    while(true) {
  // stream of (topic, ImpressionLog)
  val messages = KafkaUtils.createStream[String, ImpressionLog, StringDecoder, ImpressionLogDecoder](streamingContext, kafkaParams, topics, StorageLevel.MEMORY_AND_DISK)
  val parsedData = messages.map(_._2).map { meter =>
    //val parts = meter.
    (meter.usage_kwh.toDouble, processData(meter.usage_date, meter.usage_start_time))
  }.cache()
  //    println("Received Messages => " + messages.map(_._2).map(meter => println(meter.usage_date.toString())))
  //  }
  val numFeatures = 25
  val algorithm = new LBFGS(new LeastSquaresGradient(), new SimpleUpdater())
  //  val model = new StreamingLinearRegressionWithSGD().setInitialWeights(Vectors.zeros(numFeatures))
  //  model.trainOn(parsedData)
  //  model.predictOnValues(parsedData.map(lp => (lp.label, lp.features))).print()
  var initialWeights = Vectors.dense(Array.fill(numFeatures)(scala.util.Random.nextDouble()))
  var isFirst = true
  var model = new LinearRegressionModel(null, 1.0)
  var arWeights = ArrayBuffer[Vector]()

  def processData(pDate: String, pTime: String): Vector = {
    val inDate = new DateTime(pDate.trim())
    val iDay = inDate.getDayOfWeek()
    val vect = Vectors.zeros(25).toArray
    if (iDay > 5) {
      vect(24) = 1;
    } else {
      vect(24) = 0;
    }
    val iHour = pTime.split(":")(0).trim().toInt
    if (iHour != 23) {
      vect(iHour + 1) = 1;
    }
    vect(0) = 1.0
    //println(pDate + "::" + pTime)
    //println("vect("+iHour+" ==> "+ vect(iHour))
    //    println("isWeekEnd ==> "+ vect(23))
    //    println(vect)
    Vectors.dense(vect)
  }

  parsedData.foreachRDD { (rdd, time) =>
    rdd.saveAsTextFile("/home/ecomotto/Downloads/Data/modeld/rdd-" + time + ".rdd")
    if (isFirst) {
      val weights = algorithm.optimize(rdd, initialWeights)
      val w = weights.toArray
      val intercept = w.head
      model = new LinearRegressionModel(Vectors.dense(w.drop(1)), intercept)
      isFirst = false
    } else {
      var ab = ArrayBuffer[Double]()
      ab.insert(0, model.intercept)
      ab.appendAll(model.weights.toArray)
      print("Intercept = " + model.intercept + " :: modelWeights = " + model.weights)
      initialWeights = Vectors.dense(ab.toArray)
      print("Initial Weights: " + initialWeights)
      arWeights.append(initialWeights)
      val weights = algorithm.optimize(rdd, initialWeights)
      val w = weights.toArray
      val intercept = w.head
      model = new LinearRegressionModel(Vectors.dense(w.drop(1)), intercept)
    }
    //    val mdl = model.weights ++ Vectors.dense(model.intercept)
    //    mdl.toString
    val fos = new FileOutputStream("/home/ecomotto/Downloads/Data/modeld/model-" + time + ".model")
    val oos = new ObjectOutputStream(fos)
    oos.writeObject(model)
    oos.close

    //    println(model)

    //    initialWeights = Vectors.dense(model.weights.toArray)

  }

  //  val w = weights.toArray
  //  val intercept = w.head
  //  val model = new LinearRegressionModel(Vectors.dense(w.drop(1)), intercept)
  //  println(model)

  //}
  //    // Scale the features
  //    val scaler = new StandardScaler(withMean = true, withStd = true).fit(parsedData.map(x => x.features))
  //    val scaledData = parsedData.map(x => LabeledPoint(x.label,scaler.transform(Vectors.dense(x.features.toArray))))
  //
  //    // Building the model
  //    val numIterations = 500
  //    val step = 0.8
  //    val algorithm = new LinearRegressionWithSGD()
  //    algorithm.setIntercept(true)
  //    algorithm.optimizer.setNumIterations(numIterations).setStepSize(step)
  //    //algorithm.optimizer.setGradient(null)
  //    val model = algorithm.run(parsedData)

  streamingContext.start()
  streamingContext.awaitTermination()
  // }

}
