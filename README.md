# chat-server
[very useful guide](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)

# how to run locally
run using nodemon
`npm run dev`
use vscode liveserver + `client.html` to test (make sure client.html is connecting to local)

build and run container:
`docker build -t chat-server .` (after building you can also run from gui)
`docker run -d -p 4000:4000 --name chat-server chat-server`

to stop and remove:
`docker stop chat-server`
`docker rm chat-server`

# how push container build to aws???
*make sure you are authenticated with the aws cli* 

this how: 
`aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 598117396923.dkr.ecr.us-east-2.amazonaws.com` 

`docker build -t chat-server .` 

`docker tag chat-server:latest 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:VERSION` 

`docker push 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:VERSION` 

# deploying to aws cloudfront 
*make sure you are authenticated with the aws cli* 

`aws cloudformation deploy --stack-name=production --template-file=public-vpc.yml --capabilities=CAPABILITY_IAM` 

go to https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/ create a new stack with the public-service.yml template 

put in the correct aws ecr docker image url in the form 

set desiredcount to 1 for now 

name it whatever (stack name and service name) 

set containerport to 4000 

Once it has finished creating, the ExternalUrl is under the "Outputs" tab 

# update a stack
go into the stack and change the container image name to whatever the new tagged VERSION is 
