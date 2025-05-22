const createFormatedCSV = async (data) => {
  const CSV = data.map(product => ({
    Handle: product.productHandle,
    Title: product.productTitle,
    Vendor: product.productBrand,
    SKU: product.productSku,
    'Variant Price': product.productPricePen,
    'Variant Price (USD)': product.productPriceUsd,
    'Image Src': product.productImage,
    'Body (HTML)': product.productDescription,
    Tags: product.productTags,
    Type: product.productCategory,
    Published: product.productStock
  }))
  return CSV
}
export default createFormatedCSV
