import express, { json } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import cors from 'cors'
import '../typeorm'
import '@shared/container'
import uploadConfig from '@config/upload'
import handleErrors from './middlewares/handleErrors'
import routes from './routes'

const app = express()
app.use(cors())
app.use(json())
app.use('/uploads', express.static(uploadConfig.storagePath))
app.use(routes)
app.use(handleErrors)

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on http://localhost:3333')
})
