FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start build
RUN npm run build

# install serve and start server
RUN npm install -g serve 

CMD serve -s build 