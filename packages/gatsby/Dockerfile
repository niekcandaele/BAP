FROM node:14 as builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


FROM gatsbyjs/gatsby
COPY --from=builder /app/public /pub