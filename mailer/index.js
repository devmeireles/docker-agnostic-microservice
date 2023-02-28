const kafkajs = require('kafkajs');
const nodemailer = require('nodemailer');

const kafka = new kafkajs.Kafka({
    clientId: 'email-consumer',
    brokers: [
        'redpanda:29092'
    ],
});

const consumer = kafka.consumer({
    groupId: 'email-consumer'
});

(async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({
            topic: 'email-topic',
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async (message) => {
                const user = message.message.value.toString();
                const { name, email } = JSON.parse(user);

                const transporter = nodemailer.createTransport({
                    host: 'mailhog',
                    port: 1025,
                });

                await transporter.sendMail({
                    from: 'example@mail.com',
                    to: email,
                    subject: `From Docker - ${name}`,
                    html: `Message sent #${message.message.timestamp} for ${name} as ${email}`,
                });

                await transporter.close();
            }
        })
    } catch (error) {
        console.log(error);
    }
})();