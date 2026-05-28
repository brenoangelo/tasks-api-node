export function logger(req, res) {
    // 1. Marca o momento exato em que a requisição chegou
    const start = Date.now();

    // 2. Extrai os dados da requisição
    const { method, url } = req;

    // 3. Escuta o evento 'finish'. Ele roda AUTOMATICAMENTE quando a rota envia o res.end()
    res.on('finish', () => {
        // 4. Calcula quantos milissegundos se passaram
        const duration = Date.now() - start;
        
        // 5. Pega o status que a rota devolveu (ex: 200, 404, 500)
        const status = res.statusCode;

        // 6. Formata a data atual de forma legível
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

        // 7. Exibe o log formatado no terminal
        console.log(`[${timestamp}] ${method} ${url} - ${status} (${duration}ms)`);
    });
}