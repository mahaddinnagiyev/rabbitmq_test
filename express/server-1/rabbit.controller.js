const { Router } = require("express");
const amqp = require("amqplib");

const router = Router();

const url = "amqp://localhost";

router.post("/send", async (req, res) => {
    const queue = "direct_queue_rabbit";
    const data = {
        id: Math.random(),
        name: "Mahaddin",
        surname: "Nagiyev",
        subject: "Information Technology"
    }

    try {
        const { exchange } = req.query;

        if (!exchange) {
            await sendMessage(queue, JSON.stringify(data));
        }

        if (exchange === "direct") {
            const directExchange = "direct_exchange";
            const routingKey = "direct_key";

            await sendDirectMessage(directExchange, routingKey, JSON.stringify(data));
        } else if (exchange === "headers") {
            const headerExchange = "header_exchange";
            const frstData = data;
            const scndData = {
                naname: "Mahaddin",
                surname: "Aliyev",
                subject: "Information Technology"
            }

            const frstProps = { 'x-match': 'all', 'name': 'Mahaddin', 'surname': 'Nagiyev' }
            const scndProps = { 'x-match': 'any', 'name': 'Mahaddin', 'surname': 'Valiyev' }

            // await sendHeaderMessage(headerExchange, [frstData, scndData], scndProps);
            await sendHeaderMessage(headerExchange, frstData, frstProps);

        } else {
            return res.status(400).json({
                success: "BAD_REQUEST",
                message: "Invalid exchange method"
            })
        }

        res.status(201).json({
            success: "OK",
            message: "Data sent successfully"
        })
    } catch (error) {
        console.error("Error in send data: ", error);
    }
});

async function sendMessage(queueName, payload) {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel()

        await channel.assertQueue(queueName);

        channel.sendToQueue(queueName, Buffer.from(payload));

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error in send message function: ", error);
    }
}

async function sendDirectMessage(exchange, routingKey, payload) {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, "direct");

        channel.publish(exchange, routingKey, Buffer.from(payload));

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error("Error in sendDirectMessage: ", error)
    }
}

async function sendHeaderMessage(exchange, payload, props) {
    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, "headers");

        channel.publish(exchange, '', Buffer.from(JSON.stringify(payload)), { headers: props })

        await channel.close();
        await connection.close();
    } catch (error) {
        console.log("Error in sendHeaderMessage: ", error);
    }
}

module.exports = router