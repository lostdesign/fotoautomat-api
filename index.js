const path = require('path');
const fs = require('fs');
const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'images'),
})

fastify.get('/paths', async (request, reply) => {
    reply.send({
        images: fs
            .readdirSync('./images', { withFileTypes: true })
            .map(image => image.name)
            .filter(image => !image.includes('thumbnail'))
            .filter(image => !image.includes('qr'))
            .filter(image => image.includes('.jpg'))
    })
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
