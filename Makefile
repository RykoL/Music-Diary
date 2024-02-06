
.PHONY=precommit

pre-commit:
	npm run lint
	npm run check
	npm run test
	npm run e2