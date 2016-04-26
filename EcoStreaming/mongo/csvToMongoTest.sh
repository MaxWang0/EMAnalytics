#!/bin/bash   
dir="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs/"
dir1="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs_csv/*"
dirback="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs_csv_backup/"


for f in $dir1
do
   mongoimport -d mydb -c events --type csv --file "$f" --headerline --upsert
   mongoimport -d mydb -c newtable --type csv --file "$f" --headerline --upsert
   start=$(date +%F%H:%M:%S)
   echo $start "import" $f "done"  >> logfile.log
   sudo mv "$f" $dirback
   nohup mongo &
   mongo < createtable2.js 
   wait
done

