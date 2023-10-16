FROM node:20.5.1 AS main

WORKDIR /support-ticketing-system/client

COPY client/package*.json ./

RUN npm install

COPY client/ ./

RUN npm run build


FROM python:3.11.4 AS final

WORKDIR /support-ticketing-system/server

COPY ./server/ /support-ticketing-system/server

RUN pip install -r requirements.txt

COPY --from=main /support-ticketing-system /support-ticketing-system/

EXPOSE 5000

CMD ["python", "app.py"]