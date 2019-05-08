#FROM node
#
## Create app directory
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#
## Install app dependencies
#COPY package.json /usr/src/app/
#RUN npm install
#
## Bundle app source
#COPY . .
#
#EXPOSE 8080
#CMD [ "npm", "start" ]


###############################################################################
# Step 1 : Builder image
#
FROM node:9-alpine AS builder

# Define working directory and copy source
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
# Install dependencies and build whatever you have to build
# (babel, grunt, webpack, etc.)
RUN npm install

###############################################################################
# Step 2 : Run image
#
FROM node:9-alpine
ENV NODE_ENV=development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install deps for production only
COPY package.json /usr/src/app/

RUN npm install && \
    npm cache clean --force
## Copy builded source from the upper builder stage
#COPY --from=builder /home/node/app/build ./build
COPY . .
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 9000

# Start the app
CMD npm start