FROM cypress/included:6.8.0

COPY . .

RUN npm install --save-dev cypress

RUN $(npm bin)/cypress verify
CMD ["./wait-for.sh", "127.0.0.1:1337", "$(npm bin)/cypress", "run"]