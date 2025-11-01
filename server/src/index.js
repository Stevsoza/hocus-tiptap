import "dotenv/config"
import { Server } from '@hocuspocus/server'
import { MongoDB } from './mongo.js'

const server = new Server({
  port: process.env.WSPORT || 3000,
  extensions: [
    new MongoDB({
      url: process.env.MONGO_URL || 'mongodb://localhost:27017',
      database: process.env.DATABASE || 'hocuspocus',
    }),
  ],
})

server.listen()


