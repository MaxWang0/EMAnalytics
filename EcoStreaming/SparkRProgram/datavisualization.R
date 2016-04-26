//data manipulation in sparkR

library(SparkR)


args <- commandArgs(trailing = TRUE)

if (length(args) != 1) {
  print("Usage: datavisualization.R <path-to-ercotdata.zip>")
  q("no")
}



ercotDataPath <- args[[1]]



filename <- unzip(ercotDataPath, list = TRUE)

filename <- as.character(filename[1])
Zip1_df <- read.csv(unz(ercotDataPath, filename), header = T, sep = ",")


write.table(t(Zip1_df[,4]), "testMatrix.txt", col.names = F, row.names = F, sep = "\t", quote = F, append = T)
sparkR.stop()
