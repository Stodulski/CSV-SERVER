import File from '../models/file.js'
import { parse } from 'json2csv'
import {
  getAllProductsURL,
  collectCollectionData,
  saveCSV
} from '../services/file.services.js'
import getFormatedDate from '../utils/getFormatedDate.js'
import createFormatedCSV from '../utils/createFormatedCSV.js'

export const generateCSV = async (req, res) => {
  try {
    const { url } = req.body
    const cleanUrl = new URL(url)
    const urls = await getAllProductsURL(url)
    const data = await collectCollectionData(urls, cleanUrl)
    const date = getFormatedDate()
    const filename = `${date}.csv`
    const formatedCSV = await createFormatedCSV(data)
    const CSV = parse(formatedCSV)
    await saveCSV(filename, data)
    res.setHeader('Content-Type', 'text/csv')
    res.status(200).json({
      filename,
      CSV
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error generating CSV',
      error: err.message
    })
  }
}

export const downloadCSV = async (req, res) => {
  const file = req.params.file
  const response = await File.findById(file)
  const formatedCSV = await createFormatedCSV(response.content)
  const CSV = parse(formatedCSV)
  res.status(200).json({ filename: response.filename, CSV })
}

export const getAllFiles = async (req, res) => {
  const files = await File.find()
  res.status(200).json(files)
}

export const deleteCSV = async (req, res) => {
  try {
    const id = req.params.id
    const deletedFile = await File.findByIdAndDelete(id)
    res.status(200).json({ deletedFile })
  } catch (error) {
    res.status(404).json({ error: 'Error deleting file' })
  }
}
