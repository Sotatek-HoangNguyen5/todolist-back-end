FROM node:12.22.1 as builder
WORKDIR /app/todolist
COPY ./package.json .
COPY ./yarn.lock .
COPY . .
#chown [OPTION]... [OWNER][:[GROUP]] FILE...
#-R, --recursive
#   operate on files and directories recursively
#RUN chown -R node:node /app/todolist
#CMD [ "./scripts/start.sh" ]
CMD yarn start:dev