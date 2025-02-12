import axios from 'axios';

const API_URL = 'https://5fc9346b2af77700165ae514.mockapi.io';

export const getProducts = async (page = 1, searchQuery = '', filters = {}) => {
  try {
    let url = `${API_URL}/products?page=${page}&limit=12`; // Sayfalama

    if (searchQuery) {
      url += `&name=${searchQuery}`; // Arama
    }
    //Filtreleme
    if (filters.sort) {
      let order = "";
      if (filters.sort === "oldToNew") {
        order = "asc";
      }
      if (filters.sort === "newToOld") {
        order = "desc";
      }

      if (filters.sort === "highToLow" || filters.sort === "lowToHigh") {
        url += `&sortBy=price&order=${order}`;
      } else {
        url += `&sortBy=createdAt&order=${order}`;
      }

    }

    if (filters.brands && filters.brands.length > 0) {
      url += `&brand=${filters.brands.join(',')}`;
    }
    if (filters.models && filters.models.length > 0) {
      url += `&model=${filters.models.join(',')}`;
    }

    const response = await axios.get(url);
     //API'den gelen veriyi ve toplam ürün sayısını dönüyoruz.
      return {
        products: response.data,
        totalCount: response.headers['x-total-count']
    };


  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Hatayı saga'ya geri fırlat
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data; // API'den gelen veriyi direkt dönüyoruz.
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Hatayı saga'ya geri fırlat
  }
};