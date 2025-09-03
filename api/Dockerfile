FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install        # dev deps included for live reload
COPY . .
CMD ["npm", "run", "start:dev"]
