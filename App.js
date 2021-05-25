import axios from 'axios';
import React, { useEffect } from 'react'
import { Provider as PaperProvider } from "react-native-paper";
import NavigationContainer from "./src/navigation/index";
import { Provider } from 'react-redux';
import store from "./src/redux/index";
import {initialize} from './src/initialize';



initialize()
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer />
      </PaperProvider>
    </Provider>

  )
}
