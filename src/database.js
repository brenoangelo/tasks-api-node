

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

  insert(table, data) {
    if(this.#database[table]) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
  }
}