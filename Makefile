# Serve all services nest js app
service.serve.all:
	npx nx run-many --target=serve
.PHONY: service.serve.all

lint.all:
	npx nx run-many --target=lint
.PHONY: lint.all