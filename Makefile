# Determine this makefile's path.
# Be sure to place this BEFORE `include` directives, if any.
# THIS_FILE := $(lastword $(MAKEFILE_LIST))
THIS_FILE := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include vars.mk

#################################
# Build and publish targets
#################################
.PHONY: build-beol-image
build-beol-image: ## build BEOL APP image locally
	docker buildx build --platform linux/amd64 -t $(BEOL_IMAGE) -t $(BEOL_REPO):latest .

.PHONY: publish-beol-image
publish-beol-image: build-beol-image ## publish BEOL APP Docker image to Docker-Hub
	docker buildx build --platform linux/amd64 -t $(BEOL_IMAGE) -t $(BEOL_REPO):latest --push .

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
