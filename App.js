import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavContainer from "./src/navigation/nav";

export default function App() {
  useEffect(() => {
    console.log('User Effect: ', { obj: 'Hello' })
    return () => {
    }
  }, [])

  return (
    <SafeAreaProvider>
      {/* <MyHeader /> */}
      {/* <Drawer /> */}
      <NavContainer />
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
