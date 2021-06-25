const app = require('./src/app')


let PORT = process.env.PORT || 3000

app.get('/test', (req, res) => {
    res.send(`any thing`)
})

app.listen(PORT)