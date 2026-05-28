
import { parse } from "csv-parse";
import http from 'node:http'

export function importTasksCsv(req, res) {
    const csvProccess = parse({
        columns: true,
        trim: true,
        skip_empty_lines: true
    })

    req.pipe(csvProccess)

    csvProccess.on('data', (row) => {
        const data = JSON.stringify({
            id: row.id,
            title: row.title,
            description: row.description,
            updated_at: row.updated_at,
            created_at: row.created_at,
            completed: row.completed
        })

        const dispatchOptions = {
            hostname: 'localhost',
            port: 3333,
            path: '/tasks',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content_Length': Buffer.byteLength(data)
            }
        }

        const dispatch = http.request(dispatchOptions, (response) => {
            response.resume()
        })

        dispatch.on('error', (error) => {
            console.error(`Falha ao enviar a task "${row.title}":`, erro.message)
        })
        dispatch.write(data)
        dispatch.end()
    })

    csvProccess.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify({
            mensagem: 'Dados importados com sucesso para a memória!',
        }))
    })

    csvProccess.on('error', (error) => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'Erro ao processar o CSV: ' + erro.message }));
    })
}