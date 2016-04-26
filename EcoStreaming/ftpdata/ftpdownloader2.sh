#!/bin/bash


while true
do 
    sleep 1d      #download once a day
    sudo lftp -e 'set ftp:ssl-force true; set ssl:verify-certificate no; mirror  adhocusage/*.asc   /home/emotto_user2/ftpdata/ascfiles/' -u ecomotto,pa55wordeco ftp.smartmetertexas.biz
done

