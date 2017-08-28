FROM node:latest
EXPOSE 4200 
WORKDIR /var/www/admin.getnativelearning.com
CMD \
  npm install && \
  npm start
