ARG NODE_VERSION='22.14.0'
ARG CHROME_VERSION='133.0.6943.126-1'
ARG EDGE_VERSION='133.0.3065.82-1'

FROM cypress/factory:5.4.0

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm i

ENTRYPOINT ["npx", "cypress", "run"]