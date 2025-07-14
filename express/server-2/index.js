const express = require("express");
const amqp = require("amqplib")

const PORT = 4001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const url = "amqp://localhost";

// Queue
const queue = "direct_queue_rabbit";

// Routin Key
const routingKey = "direct_key";

// Header Properties
const frstProps = { 'x-match': 'any', 'name': 'Mahaddin', 'surname': 'Valiyev' }
const scndProps = { 'x-match': 'all', 'name': 'Mahaddin', 'surname': 'Nagiyev' }

async function recieveMessage(queueName) {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    channel.consume(queueName, (payload) => {
        if (payload) {
            console.log("<===== DATA RECIEVED =====>");
            console.log(JSON.parse(payload.content.toString()));
            channel.ack(payload);
        };

        console.log("<=== LISTENNING ===>")
    })
}

async function recieveDirectMessage(queueName, routingKey) {
    const exchange = "direct_exchange";

    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);
        await channel.bindQueue(queueName, exchange, routingKey);

        channel.consume(queueName, (payload) => {
            if (payload) {
                console.log("<===== DATA RECIEVED FROM DIRECT EXCHANGE =====>");
                console.log(JSON.parse(payload.content.toString()));
                channel.ack(payload);
            }
        })
    } catch (error) {
        console.log("error in recieveDirectMessage: ", error);
    }
}

async function recieveHeaderMessage(queueName, props) {
    const exchange = "header_exchange";

    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);

        await channel.bindQueue(queueName, exchange, '', props);

        channel.consume(queueName, (payload) => {
            if (payload) {
                console.log("<===== RECEIVED HEADER EXCHANGE DATA =====>");
                console.log(JSON.parse(payload.content.toString()));
                console.log("<=== LISTENNING ===>");

                channel.ack(payload);
            }
        })

    } catch (error) {
        console.log("error in recieveHeaderMessage: ", error);
    }
}

app.listen(PORT, async () => {
    console.log(`Server is working on port: ${PORT}`);
    await recieveMessage(queue);
    await recieveDirectMessage(queue, routingKey);
    await recieveHeaderMessage(queue, frstProps);
});
