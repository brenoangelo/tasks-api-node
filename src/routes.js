import { randomUUID } from 'node:crypto'

import { Database } from "./database.js"
import { dateUTC } from './utils/date.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const TODAY = new Date()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params

      const data = database.selectById('tasks', id)

      console.log(data)

      if(!data) {
        return res.writeHead(404).end()
      }

      return res.end(JSON.stringify(data))
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handle: (req, res) => {
      const data = database.select('tasks')

      return res.end(JSON.stringify(data))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
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
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, {
        title,
        description,
        updated_at: dateUTC(TODAY)
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handle: (rqe, res) => {
      console.log('params: ', req.params)
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]