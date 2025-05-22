import { Router } from 'express'
import {
  generateCSV,
  downloadCSV,
  getAllFiles,
  deleteCSV
} from '../controllers/files.controllers.js'

const router = Router()

router.post('/csv', generateCSV)
router.get('/csv', getAllFiles)
router.delete('/csv/:id', deleteCSV)
router.get('/csv/:id', downloadCSV)

export default router
