const kafkajs = require('kafkajs');
const fakerjs = require('@faker-js/faker');

const faker = fakerjs.faker;

const kafka = new kafkajs.Kafka({
    clientId: 'email-consumer',
    brokers: [
        'redpanda:29092'
    ],
});

const producer = kafka.producer();

(async () => {
    setInterval(async () => {
        try {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            const user = {
                name: `${firstName} ${lastName}`,
                email: faker.internet.email(firstName, lastName).toLowerCase(),
            }

            await producer.connect();
            await producer.send({
                topic: 'email-topic',
                messages: [
                    {
                        value: JSON.stringify(user),
                    },
                ],
            });

            console.log(user);

            await producer.disconnect();
        } catch (error) {
            console.log(error);
        }
    }, 2200)
})();
