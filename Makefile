env.start:
	docker-compose up -d
.PHONY: env.start

env.stop:
	docker-compose down
.PHONY: env.stop

# Serve all services nest js app
service.serve.all:
	npx nx run-many --target=serve
.PHONY: service.serve.all

lint.all:
	npx nx run-many --target=lint
.PHONY: lint.all