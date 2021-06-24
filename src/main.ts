import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
/* import events from './core/events' */
import { prelude } from './config/prelude'

const main = () => {
  prelude()

  let users: string[] = []

  const app = express()
  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
    },
  })

  app.use(cors())

  app.get('/', (_, res) => {
    res.json({ response: 'ok' })
  })

  io.listen(server)

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    const existingSocket = users.find((existingSocket) => existingSocket === socket.id)

    if (!existingSocket) {
      users.push(socket.id)

      socket.emit('join', {
        users,
      })

      socket.broadcast.emit('join', {
        users,
      })
    }

    socket.on('call-user', (data: any) => {
      console.log('yes')
      socket.to(data.to).emit('call-made', {
        offer: data.offer,
        socket: socket.id,
      })
    })

    socket.on('make-answer', (data) => {
      socket.to(data.to).emit('answer-made', {
        socket: socket.id,
        answer: data.answer,
      })
    })

    socket.on('reject-call', (data) => {
      socket.to(data.from).emit('call-rejected', {
        socket: socket.id,
      })
    })

    socket.on('disconnect', () => {
      users = users.filter((existingSocket) => existingSocket !== socket.id)
      socket.broadcast.emit('leave', {
        users,
      })
    })

    /* events.map(({ eventName, action }) => {
      socket.on(eventName, (payload) => action(payload, socket))
    }) */
  })

  server.listen(process.env.PORT || 5000, () => {
    console.log('listening on *:5000')
  })
}

main()
