# 6pm Web Scraper API

## Descripción
**6pm Web Scraper API** es un servicio RESTful construido con **Node.js** y **Express** que automatiza la extracción de información de productos de la tienda **6pm** y la convierte en archivos CSV listos para su análisis o procesamiento. Incluye autenticación basada en JWT, almacenamiento de metadatos en MongoDB y operaciones CRUD sobre los CSV generados.

## Características principales
- **Autenticación JWT**  
  Protege todos los endpoints salvo `/auth/login`.
- **Web Scraping especializado**  
  - Obtiene enlaces de producto desde las páginas de categoría de 6pm.  
  - Extrae datos clave (título, SKU, precio, imágenes, descripción, etiquetas).
- **Generación de CSV**  
  Convierte los datos extraídos en un CSV estructurado y lo guarda junto a su metadata en MongoDB.
- **CRUD de archivos**  
  - Listado de todos los CSV (`GET /csv`).  
  - Descarga de un CSV específico (`GET /csv/:id`).  
  - Eliminación de CSV (`DELETE /csv/:id`).

## Tecnologías
- **Node.js** + **Express**  
- **MongoDB** con **Mongoose**  
- **JWT** para autenticación  
- **json2csv** para generación de CSV  
- **Helmet**, **CORS** y **express-rate-limit** para seguridad  
- **dotenv** para manejo de variables de entorno
