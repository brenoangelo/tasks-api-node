import { randomUUID } from 'node:crypto'

import { Database } from "./database.js"
import { dateUTC } from './utils/date.js'

const database = new Database()

const TODAY = new Date()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handle: (req, res) => {
      const data = database.select('tasks')

      return res.end(JSON.stringify(data))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handle: (req, res) => {
      const { title, description } = req.body

      database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        created_at: dateUTC(TODAY),
        updated_at: dateUTC(TODAY),
        completed_at: null
      })

      return res.writeHead(201).end()
    }
  },
]