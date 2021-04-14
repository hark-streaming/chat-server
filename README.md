# chat-server
[very useful guide](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)

# how push container build to aws???
this how:
docker build -t chat-server .

docker tag chat-server:latest 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:latest

docker push 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:latest