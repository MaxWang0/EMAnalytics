#!/bin/bash
temp="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/*"
temp2="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/"
main="/home/emotto_user2/JavaTextMining6/data/RTD_Indicative_LMPs/"
error="/home/emotto_user2/JavaTextMining6/data/processError/"

if [ "$(ls -A /home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/)" ]; then
for file in $temp
do
    if [[ ${file: -4} == ".zip" ]]; then
    for i in {1..5}
    do
        sudo unzip -o  "$file"  -d "$temp2"
        if [[ $? == 0 ]] ; then
           filename=$(unzip -Z -1 $file)
           unzipTime=$(date +%F%H:%M:%S)
           sudo echo $unzipTime "unzip" $file "succeed!" >> unziplogfile.log
           for j in {1..5}
           do
              mongoimport -d mydb -c newtable2 --type csv --file "$temp2$filename" --headerline --upsert
              if [[ $? == 0 ]] ; then
                 importTime=$(date +%F%H:%M:%S)
                 sudo echo "import" "$filename" "succeed!" $importTime >> importlogfile.log
                 mongo < createtable5.js
                 wait
                 processTime=$(date +%F%H:%M:%S)
                 sudo echo "{DownloadID: "  ${filename:4:8} ", " "Date: " ${filename:30:8} ", " "Time: " ${filename:39:6} ", " "ProcessTime: " \"$processTime\""}" > log.json
                 mongoimport -d mydb -c ercotProcessFile --file log.json
                 sudo rm "$temp2$filename"
                 sudo mv "$file" $main
                 break
              else
                 if [ j == 5 ]; then
                    importTime=$(date +%F%H:%M:%S)
                    sudo echo "import" "$filename" "fails!" $importTime >> importlogfile.log
                 fi
                 continue
              fi
           done
        break
        else
           wait 5s
           if [ i == 5 ]; then
              unzipTime=$(date +%F%H:%M:%S)
              sudo echo $unzipTime "unzip" $file "fails!" >> unziplogfile.log
              sudo rm "$temp2$filename"
              sudo mv "$file" $error
           fi
           continue
        fi
    done
  fi
done
fi

