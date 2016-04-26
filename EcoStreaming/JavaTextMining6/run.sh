sudo javac -cp jsoup-1.8.3.jar HttpDownloadMain.java  HttpDownloadUtility.java HttpDownloadFake.java
nohup sudo java -cp .:jsoup-1.8.3.jar HttpDownloadFake &
