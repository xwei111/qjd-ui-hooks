FROM harbor.qjdidc.com/public/nginx:1.19.6-alpine
RUN mkdir /opt/logs
COPY ./dist/ /opt/data/