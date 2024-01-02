const express = require('express')
const bodyParser = require('body-parser')
const { scb } = require('./extractor')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello 2024')
})

app.post('/api/slip', (req, res) => {
    const body = req.body
    let result = null
    switch (body.album) {
        case 'SCB Easy':
            result = scb(body)
            break;
    }

    res.json({ time: result.date, amount: result.amount })
})

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
})
