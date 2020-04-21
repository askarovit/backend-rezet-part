FROM node:13.2-alpine

RUN mkdir /var/server-rezet-task
COPY . /var/server_rezet_task

WORKDIR /var/server_rezet_task
RUN npm ic

CMD ["npm", "run", "start"]


