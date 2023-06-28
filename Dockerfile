FROM dokken/ubuntu-18.04

WORKDIR /Graham_Colton_ui_garden

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8083

EXPOSE 8083

CMD ["npm", "run", "storybook"]