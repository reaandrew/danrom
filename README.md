# Random Selector

Simple play project to learn Vue.js

## Deployment


Run `make deploy`

This runs three tasks:

1. Init the Terraform plugins locally

```
terraform init ./infrastructure
```

2. Run Terraform to configure and provision the infrastructure

```
terraform apply -auto-approve ./infrastructure
```

3. Deploy the files to the S3 bucket

```
aws s3 cp ./src s3://randomselector.io/ --recursive
```
