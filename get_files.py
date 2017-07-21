from ftplib import FTP
ftp = FTP('192.168.0.88') 
ftp.login('abcd', '1234')
ftp.cwd('datalog')
data = []
ftp.dir('-t', data.append)

# list recent 9 files
count = 0
for e in data:
    toks = e.split()
    file_name = toks[8]
    if count < 9:
        print(file_name)
    count += 1

ftp.quit()
ftp.close()
