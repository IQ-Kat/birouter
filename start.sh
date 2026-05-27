docker stop birouter
docker rm birouter
docker build -t birouter .
docker run -d --name birouter -p 2004:2004 --env-file .env -v birouter-data:/app/data birouter
