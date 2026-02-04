You are a senior backend + cloud engineer.

Implement a complete CRUD API project using the following requirements and constraints.

=====================
FUNCTIONAL REQUIREMENTS
=====================
1. Build CRUD APIs for a MySQL table with the following schema:
   - id (INT, PRIMARY KEY, AUTO_INCREMENT)
   - name (VARCHAR)
   - email (VARCHAR)
   - mobile_number (VARCHAR)

2. CRUD endpoints must be:
   - POST   /create   → create record
   - GET    /read     → read all records
   - PUT    /update   → update record by id
   - DELETE /delete   → delete record by id

3. Use Node.js for API logic.
4. Use MySQL as the database.
5. APIs should be exposed via API Gateway.
6. APIs should run inside AWS Lambda using a Docker image.
7. Docker image must be stored in Amazon ECR.
8. Infrastructure must be provisioned using AWS CloudFormation.

=====================
ARCHITECTURE
=====================
Client
 → API Gateway
 → Lambda (Node.js Docker Image)
 → MySQL (RDS)

=====================
PROJECT STRUCTURE (MANDATORY)
=====================
Use the following clean, production-grade structure:

crud-mysql-service/
│
├── app/                         # Application layer
│   ├── app.js                   # Lambda handler with CRUD logic
│   ├── db.js                    # MySQL connection (mysql2 or sequelize)
│   ├── package.json
│   └── Dockerfile
│
├── infra/                       # Infrastructure as Code
│   ├── ecr.yaml                 # ECR repository
│   ├── rds.yaml                 # MySQL RDS instance
│   ├── iam.yaml                 # IAM role & policies for Lambda
│   ├── lambda.yaml              # Lambda (image-based)
│   ├── apigateway.yaml          # API Gateway routes
│   └── main.yaml                # Root CloudFormation (nested stacks)
│
├── cicd/                        # CI/CD pipeline
│   └── github-actions.yaml      # Build → Push → Deploy
│
├── scripts/                     # Helper scripts
│   ├── build.sh
│   ├── push-image.sh
│   └── deploy.sh
│
└── README.md

=====================
IMPLEMENTATION DETAILS
=====================
APPLICATION:
- Use mysql2 (promise-based).
- Use environment variables for DB credentials:
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- Lambda must route requests based on:
  event.httpMethod + event.path
- Handle JSON request/response properly.
- Add basic error handling.

DOCKER:
- Use AWS Lambda Node.js base image.
- Single Dockerfile inside app/ folder.

CLOUDFORMATION:
- ECR repository must be created via CloudFormation.
- RDS MySQL instance must be created via CloudFormation.
- Lambda must reference ImageUri as a parameter (no hardcoding).
- API Gateway should use proxy integration ({proxy+}) with ANY method.
- Use nested stacks and keep templates modular.

CI/CD:
- GitHub Actions pipeline should:
  1. Checkout code
  2. Build Docker image
  3. Push image to ECR
  4. Deploy CloudFormation stack
- Pass ImageUri dynamically to CloudFormation.

=====================
OUTPUT EXPECTATIONS
=====================
1. Provide full Node.js CRUD implementation.
2. Provide Dockerfile.
3. Provide CloudFormation templates for all infra components.
4. Provide GitHub Actions pipeline YAML.
5. Clearly explain how to deploy and test APIs.

Follow best practices and keep the solution production-ready.
