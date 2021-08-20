import twilio
import random
from twilio.rest import Client 
from os import times
 
from datetime import datetime
otp = random.randint(1000, 9999)
f = open( 'otp.txt', 'w' )
f.write(str(otp))
print(otp)
account_sid = 'ACcfdb2af6df861a91e8e2d2b5ed9105f2' 
auth_token = '7256f20041b8cad91519c5aacc4f' 
client= Client(account_sid, auth_token) 
message = client.messages.create( 
body='Your OTP is-' + str(otp), 
from_='+18646614447', 
to = '+916303731463' 
)

print(message.sid) 
