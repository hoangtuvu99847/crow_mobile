import axios from 'axios';
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavigationContainer from "./src/navigation/index";

axios.defaults.baseURL = "http://192.168.241.208:5000/"

export default function App() {
  useEffect(() => {
    console.log('User Effect: ', { obj: 'Hello' })
    return () => {
    }
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer />
    </SafeAreaProvider>
  )
}



const styles = StyleSheet.create({
  headerText: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  icon: {
    marginTop: 10
  }
})
