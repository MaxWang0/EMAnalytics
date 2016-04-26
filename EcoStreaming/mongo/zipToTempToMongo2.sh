#!/bin/bash
temp="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/*"
temp2="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/"
main="/home/emotto_user2/JavaTextMining6/data/RTD_Indicative_LMPs/"
error="/home/emotto_user2/JavaTextMining6/data/processError/"
logs="/home/emotto_user2/mongo/logs/unzipToMongoLogfile.log"

if [ "$(ls -A /home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/)" ]; then
for file in `ls $temp | sort -g`
do
    if [[ ${file: -4} == ".zip" ]]; then
    for i in {1..5}
    do
        sudo unzip -o  "$file"  -d "$temp2"
        if [[ $? == 0 ]] ; then
           filename=$(unzip -Z -1 $file)
           unzipDate=$(date +%F)
           unzipTime=$(date +%H:%M:%S)
           sudo echo $unzipDate $unzipTime "unzip" $file "succeed!" >> $logs
           for j in {1..5}
           do
              mongoimport -d mydb -c newtable2 --type csv --file "$temp2$filename" --headerline --upsert
              if [[ $? == 0 ]] ; then
                 importDate=$(date +%F)
                 importTime=$(date +%H:%M:%S)
                 sudo echo "import" "$filename" "succeed in" $j "attempt." $importDate $importTime >> $logs
                 mongo mydb testcreatetable6.js
                 if [[ $? == 0 ]] ; then
                    echo "Success!"
                 else
                    sudo echo "process" "$filename" "failed in" $j "attempt." $importTime >> $logs
                 fi   
                 wait
                 processDate=$(date +%F)
                 processTime=$(date +%H:%M:%S)
                 sudo echo "{DownloadID: "  ${filename:4:8} ", " "Date: " ${filename:30:8} ", " "Time: " ${filename:39:6} ", " "ProcessTime: " \"$processDate $processTime\""}" > log.json
                 mongoimport -d mydb -c ercotProcessFile --file log.json
                 sudo rm "$temp2$filename"
                 if [[ $? == 0 ]] ; then
                   echo "remove successfully!"
                 else
                   sudo echo "fail to remove" "$filename" "in" $j "attempt" $importTime >> $logs
                 fi
                 sudo mv "$file" $main
                 if [[ $? == 0 ]] ; then
                   echo "move successfully!"
                 else
                   sudo echo "fail to move" "$file" "in" $j "attempt" $importTime >> $logs
                 fi
                 break
              else
                 if [ j == 5 ]; then
                    importDate=$(date +%F)
                    importTime=$(date +%H:%M:%S)
                    sudo echo "import" "$filename" "fails!" $importDate $importTime >> $logs
                    sudo rm "$temp2$filename"
                    sudo mv "$file" $error
                 fi
                 continue
              fi
           done
        break
        else
           wait 5s
           if [ i == 5 ]; then
              unzipDate=$(date +%F)
              unzipTime=$(date +%H:%M:%S)
              sudo echo $unzipDate $unzipTime "unzip" $file "fails!" >> unziplogfile.log
              sudo rm "$temp2$filename"
              sudo mv "$file" $error
           fi
           continue
        fi
    done
  fi
done
fi

