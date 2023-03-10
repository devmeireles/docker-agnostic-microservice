const kafkajs = require('kafkajs');
const express = require('express');
const bodyParser = require('body-parser')
const postgres = require('postgres');

const db = postgres({
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'msdatabase'
});

const app = express();
app.use(bodyParser.json());

const kafka = new kafkajs.Kafka({
    clientId: 'email-consumer',
    brokers: [
        'redpanda:29092'
    ],
});

const producer = kafka.producer();

app.get('/health', (req, res) => {
    res.status(201).json({
        status: 'working from node runtime',
        when: new Date().toDateString(),
    });
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const user = {
        name,
        email,
    };

    await db`
    insert into users
      (name, email, password)
    values
      (${name}, ${email}, ${password})
    returning name, email
  `

    await producer.connect();
    await producer.send({
        topic: 'email-topic',
        messages: [
            {
                value: JSON.stringify(user),
            },
        ],
    });

    await producer.disconnect();

    res.status(201).end();
});

app.listen(3001, () => {
    console.log('Auth service working');
});