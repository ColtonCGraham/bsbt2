FROM dokken/ubuntu-18.04

WORKDIR /Graham_Colton_Coding_Assignment12

COPY source dest package*.json ./

RUN npm install

COPY . .

ENV PORT 8083

EXPOSE 8083

CMD ["npm", "run", "storybook"]