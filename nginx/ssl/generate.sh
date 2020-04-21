
# If you want generate ssl or tsl you need to check nginx.conf file !!!

cd "$(dirname "$0")"
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj '/CN=localhost'

print 'Generate openssl was done successful'