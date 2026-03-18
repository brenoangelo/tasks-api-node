export class Database {
  #database = {}

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
  }

  delete(table, id) {
    this.#database[table].splice(
      id,
      1
    )
  }
}