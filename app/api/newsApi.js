import apiKey from "./apiKey";
import client from "./news";

const getNews = (query) => {
  return client.get(
    `/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
  );
};

export default { getNews };
