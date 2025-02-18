#!bin/bash

IMAGE_TAG="ms-otp-img"
CONTAINER_NAME="ms-otp-container"
HOST_PORT=8080
CONTAINER_PORT=3000

# cleaning up previous process
docker system prune

# remove any previous existing image with the same tag
docker rmi $IMAGE_TAG

# build a new image with the custom tag
docker build -t $IMAGE_TAG .

# run a docker container based on the built image on specified container ar the mapped ports
docker run -it -p $HOST_PORT:$CONTAINER_PORT $IMAGE_TAG