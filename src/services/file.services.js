import File from '../models/file.js'
import { parse } from 'node-html-parser'
import axios from 'axios'
import collectProductData from '../utils/collectProductData.js'

export const getAllProductsURL = async url => {
  try {
    const response = await axios.get(url)
    const html = response.data
    const root = parse(html)
    const links = root
      .querySelectorAll('a[itemprop="url"]')
      .map(link => link.getAttribute('href'))
    return links
  } catch (error) {
    throw new Error(`Error al acceder a ${url}: ${error.message}`)
  }
}

export const collectCollectionData = async (urls, cleanUrl) => {
  const productCollection = []
  try {
    for (let url of urls) {
      try {
        const response = await axios.get(cleanUrl.origin + url)
        const html = response.data
        const root = parse(html)
        const productInfo = collectProductData(root)
        productCollection.push(productInfo)
      } catch (error) {
        console.error(`Error al acceder a ${url}:`, error)
      }
    }
    return productCollection
  } catch (error) {
    console.error('Error en el scraping:', error)
  }
}

export const saveCSV = async (name, data) => {
  try {

    const CSV = data.map(product => ({
      Handle: product.productHandle,
      Title: product.productTitle,
      Vendor: product.productBrand,
      SKU: product.productSku,
      PricePen: parseFloat(product.productPricePen),
      PriceUsd: parseFloat(product.productPriceUsd),
      Image: product.productImage,
      Body: product.productDescription,
      Tags: product.productTags,
      Type: product.productCategory,
      Published: product.productStock
    }))

    const newFile = new File({
      name,
      CSV
    })
    
    const savedFile = await newFile.save()
    return savedFile
  } catch (error) {
    throw new Error(
      `Error al guardar el archivo en la base de datos: ${error.message}`
    )
  }
}

