
#!/bin/bash
set -e

IMAGE_NAME=crud-mysql
docker build -t $IMAGE_NAME ./app
