
.PHONY=precommit format

pre-commit:
	NODE_ENV=test npm run check
	npm run test
	npm run e2e

format:
	npm run format