#!/bin/bash

dir="/home/emotto_user2/ftpdata/txtfiles/"

inotifywait -m "$dir" --format '%w%f' -e create -e modify|
    while read file; do
        start=$(date +%F%H:%M:%S)
        sudo echo $start "  download   " $file " successfully! " >> ftplogfile.log
    done
