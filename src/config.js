import express from 'express'

import cors from 'cors'
import helmet from 'helmet'
import authRouter from './router/auth.router.js'
import fileRouter from './router/files.router.js'
import verifyToken from './middlewares/verifyToken.js'

const app = express()

import "dotenv/config"
import './db.js'

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(authRouter)
app.use(verifyToken)
app.use(fileRouter)

export default app
