import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import photoService from "../services/album";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos, setLoading } from "../redux/photoSlice";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

interface Photo {
  id: number;
  url: string;
}

interface RootState {
  photos: {
    data: Photo[];
    loading: boolean;
  };
}

type PhotoGridScreenRouteProp = RouteProp<RootStackParamList, "Photo Grid">;

const PhotoGridScreen = ({ route }: { route: PhotoGridScreenRouteProp }) => {
  const { albumId } = route.params;
  const dispatch = useDispatch();
  const photos = useSelector((state: RootState) => state.photos.data);
  const loading = useSelector((state: RootState) => state.photos.loading);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        dispatch(setLoading(false));
        const albumPhotos = await photoService.getPhotosByAlbum(albumId);
        dispatch(setPhotos(albumPhotos));
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        dispatch(setLoading(true));
      }
    };

    getPhotos();
  }, [albumId, dispatch]);

  if (!loading) {
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
        keyExtractor={(item) => item.id.toString()}
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
