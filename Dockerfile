### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-stretch as builder

LABEL maintainer="ivan.subotic@unibas.ch"

RUN yarn config set no-progress && yarn cache clean

## Build the angular app in production mode and store the artifacts in dist folder
## should be: $(npm bin)/ng build --prod --env=prod --build-optimizer
RUN "$(npm bin)"/ng build --prod --build-optimizer

### STAGE 2: Setup ###

FROM nginx:1.15-alpine

LABEL maintainer="ivan.subotic@unibas.ch"

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /dist/beol /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
