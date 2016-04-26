#Author: Yu Wang
#for reading the mongo to parquet file
library(SparkR)

#args <- commandArgs(trailing = TRUE)

#if (length(args) != 1) {
#  print("Usage: mongoToparquet.R <path-to-ercotdata.csv")
#}


sc <- sparkR.init(appName="SparkR-DataFrame-example")
Sys.setenv('SPARKR_SUBMIT_ARGS'='"--packages" "com.databricks:spark-csv_2.10:1.3.0" "sparkr-shell"')
sqlContext <- sparkRSQL.init(sc)

#ercotdataCsvPath <- args[[1]]


f = 1
log <- c()
time <- format(Sys.time(), "%a %b %d %X %Y")
date <- Sys.Date()
log <- c(log, paste(date, time))
Bus_df <- read.csv("/home/emotto_user2/testdata/cdr.00011485.0000000000000000.20160119.095516.LMPSELECTBUSNP6787_20160119_095512.csv", header = TRUE)
Bus_DF <- createDataFrame(sqlContext, Bus_df)
registerTempTable(Bus_DF, "BUS")
newbus <- sql(sqlContext, "SELECT * FROM BUS WHERE ElectricalBus LIKE 'MOBILE%'")
###display the average LMP
head(avg(groupBy(newbus)))
filename <- unzip("/home/emotto_user2/testdata/cdr.00011485.0000000000000000.20160119.095517854.LMPSELECTBUSNP6787_20160119_095512_csv.zip", , list = TRUE)
filename <- as.character(filename[1])
Zip1_df <- read.csv(unz("/home/emotto_user2/testdata/cdr.00011485.0000000000000000.20160119.095517854.LMPSELECTBUSNP6787_20160119_095512_csv.zip", filename), header = T, sep = ",")
Zip1_DF <- createDataFrame(sqlContext, Zip1_df)
registerTempTable(Zip1_DF, "ZIP1")
newzip1 <- sql(sqlContext, "SELECT * FROM ZIP1 WHERE ElectricalBus LIKE 'MOBILE%'")
###display the average LMP
head(avg(groupBy(newzip1)))


result <- tryCatch({
  df <- read.df(sqlContext, source= "com.stratio.datasource.mongodb", host = "localhost:27017", database = "Ercot1", collection = "BUS1", splitSize = 8, splitKey = "_id",  samplingRatio=1.0)
  filename <- paste("highschool", "students")
  log <- c(log, filename)
  log <- c(log, "/home/emotto_user2/spark-1.5.0-prebuilt")
  registerTempTable(df, "BUS1")
  oldbus <- sql(sqlContext, "SELECT * FROM BUS1 WHERE ElectricalBus LIKE 'MOBILE%'")
  noldbus <- select(oldbus, oldbus$SCEDTimestamp, oldbus$RepeatedHourFlag, oldbus$ElectricalBus, oldbus$LMP)
  fst <- rbind(noldbus, newbus)
  snd <- rbind(noldbus, newzip1)
  ###display the average LMP
  print(head(avg(groupBy(noldbus))))
  print(head(avg(groupBy(fst))))
  print(head(avg(groupBy(snd)))) 
  write.df(noldbus, "students.parquet", "parquet", "overwrite")
  log <- c(log, "SUCCESS")
  f
}, warning = function(war) {
  print(paste("MY_WARNING: ", war))
  f <- 0
  log <- c(log, war)
  return(f)
}, error = function(err) {
  print(paste("MY_ERROR: ", err))
  f <-(-1)
  log <- c(log, err)
  return(f)
})


sparkR.stop()
write.table(t(log), "log.txt", col.names = F, row.names = F, sep = "\t", quote = F, append = T)
print(paste("result =", result))
