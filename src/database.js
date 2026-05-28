import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databasePath = path.resolve(__dirname, '..', 'db.json')

export class Database {
  #database = {}

  constructor() {
    try {
      const data = fs.readFileSync(databasePath, 'utf-8')
      this.#database = JSON.parse(data)
    } catch (error) {
      this.#persist()
    }
  }

  #persist() {
    fs.writeFileSync(databasePath, JSON.stringify(this.#database, null, 2))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    } else {
      return data
    }
  }

  selectById(table, id) {
    const data = this.#database[table] ?? []

    return data.find(item => item.id === id)
  }

  insert(table, data) {
    if(this.#database[table]) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
  }

  update(table, id, data) {
    const currentData = this.selectById(table, id)
    this.#database[table].splice(
      id,
      1,
      {
        ...currentData,
        ...data
      }
    )
    this.#persist()
  }

  delete(table, id) {
    this.#database[table].splice(
      id,
      1
    )
    this.#persist()
  }
}