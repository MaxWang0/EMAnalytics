#!/bin/bash

dir="/home/emotto_user2/ftpdata/ascfiles/"

inotifywait -m "$dir" --format '%w%f' -e create|
    while read file; do
        gpg --passphrase 8708165Xx! --output $file.zip --decrypt-files $file
        unzip $file.zip -d $dir
        start=$(date +%F%H:%M:%S)
        sudo echo $start "  download   " $file " successfully! " >> ftplogfile2.log
    done
