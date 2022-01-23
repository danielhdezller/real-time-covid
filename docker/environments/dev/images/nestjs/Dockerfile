# Default: Last LTS Node version
ARG NODE_VERSION=16.13.0

FROM node:${NODE_VERSION}

# Default: Last Nestjs version
ARG NESTJS_VERSION=7.5

WORKDIR /usr/src/project

# Install the required tools
RUN apt update;

RUN apt-get install nano;

RUN npm install -g nodemon

RUN npm install -g @nestjs/cli@${NESTJS_VERSION};

CMD ["/entrypoint.sh"]