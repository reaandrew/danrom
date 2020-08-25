# Random Selector

Simple play project to learn Vue.js

## Deployment


Run `make deploy`

This runs two tasks:

1. Run Terraform to configure the hosting

```
terraform apply ./infrastructure
```

2. Deploy the files to the S3 bucket

```
aws s3 cp ./src s3://randomselector.io/ --recursive
```
