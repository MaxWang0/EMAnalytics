#!/bin/bash

while true
do
    sleep 1d
    sudo lftp -e 'set ftp:ssl-allow false; mirror  ./ /home/emotto_user2/ftpdata/txtfiles/'  -u ecomotto,ecod8t8 FTP.weatherbank.com
    sudo lftp -e 'set ftp:ssl-allow false; mirror  ./NORMALS /home/emotto_user2/ftpdata/txtfiles/'  -u ecomotto,ecod8t8 FTP.weatherbank.com
    sudo lftp -e 'set ftp:ssl-allow false; mirror  ./HISTORY /home/emotto_user2/ftpdata/txtfiles/'  -u ecomotto,ecod8t8 FTP.weatherbank.com
done
