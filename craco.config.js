module.exports = {
    devServer: {
        port: 8000,  // B端 前端
        proxy: {
            '/api': 'http://localhost:3001', 
        }
    }
}