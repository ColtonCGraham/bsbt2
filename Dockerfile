FROM dokken/ubuntu-18.04

WORKDIR /Graham_Colton_ui_garden

COPY package*.json ./

RUN apt-get update

RUN apt-get upgrade -y

RUN apt-get install npm -y

RUN apt-get install npm -y

RUN npm i -g npx

RUN npx sb init

COPY . .

ENV PORT 8083

EXPOSE 8083

CMD ["npm", "run", "storybook"]