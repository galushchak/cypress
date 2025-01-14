ARG NODE_VERSION='22.13.0'
ARG CHROME_VERSION='113.0.5672.92-1'
ARG EDGE_VERSION='131.0.2903.112-1'

FROM cypress/factory:5.1.1

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm i

ENTRYPOINT ["npx", "cypress", "run"]