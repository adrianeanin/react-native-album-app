import axios from "axios";

const getAlbums = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/?_limit=30"
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

const getPhotosByAlbum = async (albumId: number) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=30`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

const deleteAlbum = async (id: number) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export default {
  getAlbums,
  deleteAlbum,
  getPhotosByAlbum,
};
