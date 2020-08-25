.PHONY: dependencies
dependencies:
	npm install -g @vue/cli
	npm install -g @vue/cli-service-global

.PHONY: build
build:
	npm run build
	
.PHONY: deploy
deploy: dependencies build
	terraform init ./infrastructure
	terraform apply -auto-approve ./infrastructure
	aws s3 cp ./dist s3://randomselector.io/ --recursive
	aws s3 cp ./src/error.html s3://randomselector.io/
