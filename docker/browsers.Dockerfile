FROM cypress/browsers:node-22.13.0-chrome-113.0.5672.92-1-edge-131.0.2903.112-1

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm i

ENTRYPOINT ["npx", "cypress", "run"]