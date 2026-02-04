
#!/bin/bash
set -e

aws cloudformation deploy \
  --template-file infra/template.yaml \
  --stack-name crud-mysql-stack \
  --capabilities CAPABILITY_NAMED_IAM
