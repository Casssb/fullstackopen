import { Request, Response } from "express"

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello Worlds</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})