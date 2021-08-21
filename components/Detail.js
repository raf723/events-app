import React from 'react'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

const Detail = (props) => {
  const event = props.route.params.event

  return (
    <WebView originWhitelist={ ['*'] } source={{ html: event.description.html }}/>
  )
}

const styles = StyleSheet.create({})

export default Detail
