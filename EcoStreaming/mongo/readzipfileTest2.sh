#!/bin/bash   
dir="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs/*"
target="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs_csv/*"

tablename="table"
i=0

for file in $target
do
   #sudo unzip "$file" -d "$target"
   #filename=$( sudo unzip -Z -1 $file);
   ((i++))
   mongoimport -d mydb -c $tablename$i --type csv --file "$file" --headerline --upsert;
   mongoimport -d mydb -c events --type csv --file "$file" --headerline;
   #echo "$file"
   #mongo < createtable.js
   #wait
done


