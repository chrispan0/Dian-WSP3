git fetch
git pull
docker stop dian-a3
docker rm dian-a3
cd C:\Users\Administrator\Documents\GitHub\Dian-WSP3
docker build -t dian-a3 .
docker run -d -p 1477:3000 --name dian-a3 dian-a3:latest
pause