#FROM centos:centos6
FROM node:14.5.0

MAINTAINER @jacace

COPY . /src

RUN cd /src; npm install

EXPOSE 8080

CMD cd /src && node ./app.js