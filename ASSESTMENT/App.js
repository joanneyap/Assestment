import { combineReducers } from "redux";
import { Provider } from "react-redux";
import React from "react";
import HomeScreen from "./App/Screens/HomeScreen";
import { configureStore } from "@reduxjs/toolkit";
import AutocompleteReducer from "./App/store/reducer/autocomplete";
import mapMarkerReducer from "./App/store/reducer/mapMarker";
import MyLocationReducer from "./App/store/reducer/myLocation";


const App = () => {
  const rootReducer = combineReducers({
    autocomplete: AutocompleteReducer,
    mapMarker: mapMarkerReducer,
    myLocation: MyLocationReducer,
  });

  const store = configureStore({ reducer: rootReducer });

  return (
    <Provider store={store}>

      <HomeScreen></HomeScreen>
    </Provider>
  );
};
export default App;
