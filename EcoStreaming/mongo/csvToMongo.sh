#!/bin/bash
     FILES= "/home/max/JavaTextMining6/data/RTD_Indicative_LMPs/*"
     for f in $FILES
     do 
        unzip "$f" -d "/home/max/JavaTextMining6/data/RTD_Indicative_LMPs_csv/"
        mongoimport -d mydb -c events --type csv --file "$f" --headerline

while inotifywait -e modify /home/max/JavaTextMining6/data/RTD_Indicative_LMPs; do
   
dir="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs/"
dir1="/home/max/JavaTextMining6/data/RTD_Indicative_LMPs_csv/"
dirtemp="/home/max/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/*"

inotifywait -m "$dir" --format '%w%f' -e create |
    while read file; do
        unzip "$file" -d "$dirtemp"
        filename = $(unzip -Z -1 $file)
        mongoimport -d mydb -c events --type csv --file "$dir1"+"$filename" --headerline --upsert
        mongoimport -d mydb -c newtable --type csv --file "$dir1"+"$filename" --headerline --upsert
        echo "import" $dir1$filename "done" >> logfile.log
        mongo < createtable.js
        wait
    done

for f in $dirtemp
do
   mongoimport -d mydb -c events --type csv --file "$f" --headerline --upsert
   mongoimport -d mydb -c newtable --type csv --file "$f" --headerline --upsert
   sudo mv "$f" "$dir"
   mongo < createtable.js
   wait
done


for f in $dir1
do
   mongoimport -d mydb -c events --type csv --file "$f" --headerline --upsert
   mongoimport -d mydb -c newtable --type csv --file "$f" --headerline --upsert
   echo "import" $f "done" >> logfile.log
   mongo < createtable.js
   wait
done

