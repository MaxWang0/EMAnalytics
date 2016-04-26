/**
 * Created by ecomotto on 3/3/15.
 */

import org.apache.spark.SparkContext._
import org.apache.spark.mllib.linalg.{Vector, Vectors}
import org.apache.spark.mllib.optimization.{LBFGS, LeastSquaresGradient, SimpleUpdater}
import org.apache.spark.mllib.regression.LinearRegressionModel
import org.apache.spark.{SparkConf, SparkContext}
import org.joda.time.DateTime

import scala.collection.mutable.ArrayBuffer

object ecoMain {

  def main(args: Array[String]) = {
    val conf = new SparkConf()
      .setMaster("local[2]")
      .setAppName("EcoStreaming")
      .set("spark.executor.memory", "1g")
      .set("spark.rdd.compress", "true")
      .set("spark.storage.memoryFraction", "1")

    val sc = new SparkContext(conf)
    //val data = sc.parallelize(1 to 10000000).collect.filter(_<1000)
    //data.foreach(println)

    val data = sc.textFile("/home/ecomotto/Downloads/Data/IntervalMeterUsage.csv")


    val parsedData = data.mapPartitions(_.drop(1)).map {
      line =>
        val parts = line.split(',')
        (parts(4).toDouble, processData(parts(1), parts(2)))
    }.cache()

    val numFeatures = 25
    val algorithm = new LBFGS(new LeastSquaresGradient(), new SimpleUpdater())
    var initialWeights = Vectors.dense(Array.fill(numFeatures)(scala.util.Random.nextDouble()))
    var isFirst = true
    var model = new LinearRegressionModel(null, 1.0)
    var arWeights = ArrayBuffer[Vector]()

    val partData = parsedData.randomSplit(Array(0.20, 0.20, 0.20, 0.20, 0.20))
    var cn = 0

    var data2 = data.mapPartitions(_.drop(1)).map {
      line =>
        val parts = line.split(',')
        (parts(1), List(parts(4), parts(1), parts(2)))
    }

    var data3 = data2.groupByKey() //.map{case (k,v) => k->sc.makeRDD(v.toSeq)}
    val data4 = data3.map { k =>
        var parts = Array[(Double, Vector)]();
        for (a <- k._2) {
          parts = parts ++ Array[(Double, Vector)]((a(0).toDouble, processData(a(1), a(2))));
        }
        if (parts.size != 0) {
          //        println(k._1);
          println(parts.size)
        }

        parts
      }.toArray()




    partData.foreach { rdd =>
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
    }
    var ab = ArrayBuffer[Double]()
    ab.insert(0, model.intercept)
    ab.appendAll(model.weights.toArray)
    print("Intercept = " + model.intercept + " :: modelWeights = " + model.weights)
    initialWeights = Vectors.dense(ab.toArray)
    print("Initial Weights: " + initialWeights)
    arWeights.append(initialWeights)

    partData.foreach { xp =>
      cn = cn + 1;
      println(cn)
    }

  }

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
    //println(vect)
    Vectors.dense(vect)
  }
}
