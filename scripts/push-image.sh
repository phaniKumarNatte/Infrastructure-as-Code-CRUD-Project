
#!/bin/bash
set -e

AWS_REGION=ap-south-1
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REPO_NAME=crud-mysql-service

IMAGE_URI=$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME

aws ecr get-login-password --region $AWS_REGION \
| docker login --username AWS --password-stdin $IMAGE_URI

docker tag crud-mysql:latest $IMAGE_URI:latest
docker push $IMAGE_URI:latest
