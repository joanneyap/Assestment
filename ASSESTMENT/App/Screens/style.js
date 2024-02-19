import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  innerContainer: { width: "100%", height: "100%" },

  searchContainer: {
    position: "absolute",
    width: "96%",
    top: "7%",
    left: "2%",
    zIndex: 4,
    backgroundColor:'#ffffff',

  },
  dropdownContainer: {
    padding: 4,
    display: "block",
  },
  closeButtonContainer: {

    backgroundColor: "rgba(132, 132, 132, 0.43)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  
  },

  mapContainer: { alignSelf: "stretch", height: "100%" },
  searchButtonContainer: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    backgroundColor: "rgba(132, 132, 132,0.9)",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default styles;
