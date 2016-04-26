#!/bin/bash
#import and process the ercotdata in the mongodb

dirtemp="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/*"



if [ "$(ls -A /home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/)" ]; then
  for f in $dirtemp
  do
     mongoimport -d mydb -c events --type csv --file "$f" --headerline --upsert
     mongoimport -d mydb -c newtable2 --type csv --file "$f" --headerline --upsert
     start=$(date +%F%H:%M:%S)
     sudo echo "import" "$f" "done" $start >> importlogfile.log
     mongo < createtable5.js
     wait
     processTime=$(date +%F%H:%M:%S)
     filename=${f:69}
     sudo echo "{DownloadID: "  ${filename:4:8} ", " "Date: " ${filename:30:8} ", " "Time: " ${filename:39:6} ", " "ProcessTime: " \"$processTime\""}" > log.json
     mongoimport -d mydb -c ercotProcessFile --file log.json 
     sudo rm "$f"
  done
fi
