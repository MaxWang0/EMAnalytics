#!/bin/bash
dir="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs/"
dir1="/home/emotto_user2/JavaTextMining6/data/RTD_Indicative_LMPs/"
dirtemp="/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs_csv/"


inotifywait -m "$dir" --format '%w%f' -e create |
    while read file; do
        sleep 5s
        sudo unzip "$file" -d "$dirtemp"
        sudo mv "$file" $dir1
        filename=$(unzip -Z -1 $file)
        start=$(date +%F%H:%M:%S)
        echo $start "unzip" $file "done" >> unziplogfile.log
        wait
    done

