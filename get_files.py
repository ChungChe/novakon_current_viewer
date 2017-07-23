from ftplib import FTP
from datetime import datetime, timedelta
import os

ftp = FTP('192.168.0.88') 
ftp.login('abcd', '1234')
ftp.cwd('datalog')
#data = []
#ftp.dir('-t', data.append)

# get today e.g. 20170723
# Log_10_20170723.txt
# Log_10_20170722.txt
# Download the following files
dt = datetime.today()
od = dt - timedelta(days=1)
file1_name = 'Log_10_{}{:02d}{:02d}.txt'.format(od.year, od.month, od.day)
file2_name = 'Log_10_{}{:02d}{:02d}.txt'.format(dt.year, dt.month, dt.day)


file1 = open('file1.txt', 'wb')
print('Download {}...'.format(file1_name))
ftp.retrbinary('RETR {}'.format(file1_name), file1.write)

print('Download {}...'.format(file2_name))
ftp.retrbinary('RETR {}'.format(file2_name), file1.write)

file1.close()

# remove file2_name head
# sed '/Time/d' file1.txt
os.system("sed -i '/Time/d' file1.txt")
os.system("awk 'NF>20' file1.txt > file2.txt")
ftp.quit()
ftp.close()
