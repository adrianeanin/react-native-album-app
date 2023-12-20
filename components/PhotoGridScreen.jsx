import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import photoService from "../services/album";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos, setLoading, setAllPhotosLoaded } from "../redux/photoSlice";

const PhotoGridScreen = ({ route }) => {
  const { albumId } = route.params;
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.data);
  const loading = useSelector((state) => state.photos.loading);
  const allPhotosLoaded = useSelector((state) => state.photos.allPhotosLoaded);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        dispatch(setLoading(true));
        const albumPhotos = await photoService.getPhotosByAlbum(albumId);
        dispatch(setPhotos(albumPhotos));
        dispatch(setAllPhotosLoaded(true));
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getPhotos();
  }, [albumId, dispatch]);

  if (loading || !allPhotosLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator animating={true} color={MD2Colors.purple700} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image style={styles.photo} source={{ uri: item.url }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8FA",
    padding: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 10,
  },
});

export default PhotoGridScreen;
