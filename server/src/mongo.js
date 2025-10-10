import { Database } from '@hocuspocus/extension-database'
import { Binary, MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const database = 'hocuspocus'

export class MongoDB extends Database {
  constructor(configuration = {}) {
    super({})
    this.configuration = {
      database,
      url,
      fetch: async ({ documentName }) => {
        const doc = await this.db
          ?.collection('documents')
          .findOne({ documentName: documentName })

        if (doc) {
          return new Uint8Array(doc.data.buffer)
        }
        return null
      },
      store: async ({ documentName, state }) => {
        console.log('store', documentName, state)
        return this.db?.collection('documents').findOneAndUpdate(
          { documentName },
          { $set: { documentName, data: new Binary(state) } },
          { upsert: true }
        )
      },
      ...configuration, // override defaults if passed
    }
  }

  async onConfigure() {
    this.client = new MongoClient(this.configuration.url)
    await this.client.connect()
    this.db = this.client.db(this.configuration.database)
  }
}
