import axios from "axios";

const getAlbums = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/albums/?_limit=30"
    );
    console.log("Albums", response.data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const getPhotosByAlbum = async (albumId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=30`
    );
    console.log("Photos", response.data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

const deleteAlbum = async (id) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export default {
  getAlbums,
  deleteAlbum,
  getPhotosByAlbum,
};
