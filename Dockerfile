FROM alpine:3.17

# Create app directory 
WORKDIR /CampoLibre

# Ensure package.json and package-lock.json are copied
COPY package*.json ./

# Install node js
RUN apk add --update npm

# Run yarn install cmd, and install yarn globally
RUN npm install -g yarn
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]