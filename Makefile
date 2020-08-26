.PHONY: dependencies
dependencies:
	npm install
	npm install -g @vue/cli
	npm install -g @vue/cli-service-global

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build: lint
	npm run build

.PHONY: test
test:
	npm run test:unit
	
.PHONY: deploy
deploy: dependencies build test
	terraform init ./infrastructure
	terraform apply -auto-approve ./infrastructure
	aws s3 cp ./dist s3://randomselector.io/ --recursive
	aws s3 cp ./src/error.html s3://randomselector.io/
