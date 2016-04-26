#!/bin/bash
#import and process the ercotdata in the mongodb

dir="/home/emotto_user2/JavaTextMining6/data/final_RTD_Indicative_LMPs_csv/"
dirtemp="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/*"

for f in $dirtemp
do
   if [$f == "/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/*"]; then
      break
   fi
   mongoimport -d mydb -c events --type csv --file "$f" --headerline --upsert
   mongoimport -d mydb -c newtable2 --type csv --file "$f" --headerline --upsert
   start=$(date +%F%H:%M:%S)
   echo "import" "$f" "done" $start >> importlogfile.log
   sudo mv "$f" "$dir"
   nohup mongo &
   mongo < createtable5.js
   wait
done
