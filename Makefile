.PHONY: deploy
deploy:
	terraform init ./infrastructure
	terraform apply -auto-approve ./infrastructure
	aws s3 cp ./src s3://randomselector.io/ --recursive
