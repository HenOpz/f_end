# Start your image with a node base image
FROM node:lts-alpine3.20 AS build

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./
COPY . ./

# Copy local directories to the current local directory of our docker image (/app)
RUN npm install
RUN npm run build

FROM node:lts-alpine3.20 AS run-time
WORKDIR /App
COPY --from=build /app/package*.json ./
COPY --from=build /app/. ./
COPY --from=build /app/src ./src
COPY --from=build /app/public ./public
COPY --from=build /app/dist ./dist
# Install node packages, install serve, build the app, and remove dependencies at the end

EXPOSE 8081

# Start the app using serve command
ENTRYPOINT [ "npm" ]
CMD ["run","serve"]
