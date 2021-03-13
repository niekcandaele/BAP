FROM cypress/included:3.2.0

COPY . .

RUN npm install --save-dev cypress

RUN $(npm bin)/cypress verify
CMD ["./wait-for.sh", "strapi:1337", "$(npm bin)/cypress", "run"]