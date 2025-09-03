FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install        # dev deps included
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
