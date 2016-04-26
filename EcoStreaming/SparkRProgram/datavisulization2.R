//data manipulation in R
mat <- read.csv("testMatrix.txt", header = F, sep = "\t")
plot(as.numeric(mat[2,]), type = "l", xlab = "Electrical Bus", ylab = "Price", ylim = c(10,30))
plot(as.numeric(mat[,2]), type = "l", xlab = "Time", ylab = "Price", ylim = c(10,30))

