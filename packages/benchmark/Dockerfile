FROM cypress/included:3.2.0

COPY . .

RUN npm install --save-dev cypress

RUN $(npm bin)/cypress verify
CMD ["$(npm bin)/cypress", "run"]