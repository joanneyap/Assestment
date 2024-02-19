import { Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "../config/constants";
import * as AutocompleteAction from "../store/action/autocomplete";
import * as MapMarkerAction from "../store/action/mapMarker";
import * as MyLocationAction from "../store/action/myLocation";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import Button from "@ant-design/react-native/lib/button";
import View from "@ant-design/react-native/lib/view";
import WhiteSpace from "@ant-design/react-native/lib/white-space";
const HomeScreen = () => {
  const searchRef = useRef();
  const mapRef = useRef();
  const [search, setSearch] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const dispatch = useDispatch();
  const coordinate = useSelector((state) => state.autocomplete.autocomplete);
  const mapMarker = useSelector((state) => state.mapMarker.mapMarker);
  const myLocation = useSelector((state) => state.myLocation.myLocation);
  const loadAutocomplete = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});

    dispatch(
      AutocompleteAction.fetchAutocomplete({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    );

    dispatch(
      MyLocationAction.fetchMyLocation({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    loadAutocomplete();
  }, [loadAutocomplete]);

  const clearSearchHandler = () => {
    searchRef.current.clear();
    setSearch("");
  };

  const myCurrentLocationHandler = () => {
    mapRef.current.animateToRegion(myLocation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {mapReady && (
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              styles={{
                textInputContainer: {
                  width: "100%",
                  width: "96%",
                  boxShadow: "",
                  borderRadius: 0,
                },
                textInput: {
                  height: 40,
                  color: "#5d5d5d",
                  fontSize: 16,
                  width: "96%",
                  borderRadius: 0,
                },
                poweredContainer: {
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                },
              }}
              ref={searchRef}
              enablePoweredByContainer={false}
              minLength={2}
              returnKeyType={"Search"}
              placeholder="Location"
              onPress={(data, details = null) => {
                const result = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                };
                dispatch(MapMarkerAction.fetchMapMaker(result));
                setSearch(details.geometry.location.lat);
                dispatch(AutocompleteAction.fetchAutocomplete(result));
              }}
              fetchDetails
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en", // language of the results
                components: "country:my",
              }}
              renderRightButton={() =>
                search !== "" && (
                  <Button
                    onPress={() => clearSearchHandler()}
                    size="small"
                    style={styles.closeButtonContainer}
                  >
                    <AntDesign name="close" size={20} color="#f1433b" />
                  </Button>
                )
              }
              textInputProps={{ onChangeText: (text) => setSearch(text) }}
              nearbyPlacesAPI="GooglrPlacesSearch"
              onNotFound={() => console.log("no results")}
              onFail={(error) => console.log(error)}
              debounce={400}
              renderRow={(rowData) => {
                const title = rowData.structured_formatting.main_text;
                const address = rowData.structured_formatting.secondary_text;
                return (
                  <View style={styles.dropdownContainer}>
                    <Text style={{ fontSize: 14, fontWeight: 700 }}>
                      {title}
                    </Text>

                    <WhiteSpace size="sm" />

                    <Text style={{ fontSize: 14 }}>
                      {address}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        )}

        {coordinate.length !== 0 && (
          <MapView
            ref={mapRef}
            style={styles.mapContainer}
            initialRegion={{
              latitude: 3.082697643317872,
              longitude: 101.58797278034463,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onMapReady={() => setMapReady(true)}
            region={coordinate}
            zoomControlEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            showsScale={true}
            showsBuildings={true}
            showsCompass={true}
            loadingEnabled
          >
            {mapMarker.length !== 0 && (
              <Marker
                coordinate={{
                  latitude: parseFloat(mapMarker.latitude),
                  longitude: parseFloat(mapMarker.longitude),
                }}
              />
            )}
          </MapView>
        )}

        {mapReady && (
          <Button
            style={styles.searchButtonContainer}
            onPress={() => myCurrentLocationHandler()}
            size="small"
          >
            <AntDesign name="man" size={20} color="#ffffff" />
          </Button>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
