import twilio
import random
from twilio.rest import Client 
from os import times
import mysql.connector
from datetime import datetime
otp = random.randint(1000, 9999)
f = open( 'otp.txt', 'w' )
f.write(str(otp))
print(otp)
account_sid = 'ACcfdb2af6df861a91e8e2d2b5ed9105f2' 
auth_token = 'b5e4c71089f6f43f400256292807dc66' 
client= Client(account_sid, auth_token) 
message = client.messages.create( 
body='Your OTP is-' + str(otp), 
from_='+18646614447', 
to = '+916303731463' 
)

print(message.sid) 


mydb = mysql.connector.connect(
 
  host="localhost",
  user="root",
  password="Awez@0987",
  port= "3306",
  database="database1"
)

mycursor = mydb.cursor()

with open('currentlogin.txt','r') as file:
  user = file.read()
print(user)

date = datetime.now()
 
sql = "DELETE FROM  otp WHERE (user = user)"
mycursor.execute(sql)

mydb.commit()
sql1 = "INSERT INTO otp (user, otp, time) VALUES (%s, %s, %s)"
val = (user, otp ,date )
mycursor.execute(sql1, val)

mydb.commit()


