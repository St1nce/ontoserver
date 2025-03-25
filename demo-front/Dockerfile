FROM node:latest

WORKDIR /usr/src/app/kotobot-front

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Opening port 3000 for the daemon
EXPOSE 3000

# Command to start
CMD [ "npm", "run", "start" ]