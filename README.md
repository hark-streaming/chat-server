# chat-server
[very useful guide](https://medium.com/containers-on-aws/building-a-socket-io-chat-app-and-deploying-it-using-aws-fargate-86fd7cbce13f)

# how push container build to aws???
this how:
`docker build -t chat-server .`

`docker tag chat-server:latest 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:latest`

`docker push 598117396923.dkr.ecr.us-east-2.amazonaws.com/hark-dev-chat-server:latest`

# deploying once on aws
*make sure you are authenticated with the aws cli*

`aws cloudformation deploy --stack-name=production --template-file=public-vpc.yml --capabilities=CAPABILITY_IAM`

put in the correct aws ecr docker image url in the form

set desiredcount to 1 for now

name it whatever (stack name and service name)

set containerport to 4000

Once it has finished creating, the ExternalUrl is under the "Outputs" tab
