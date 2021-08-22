import React, { useEffect } from 'react'
import { View, StyleSheet, Button, Linking } from 'react-native'
import WebView from 'react-native-webview'
import { Icon } from "react-native-elements";

const Detail = (props) => {
  const event = props.route.params.event

  // Header options
  useEffect(() => {
    props.navigation.setOptions({
      // Set header title to event name
      title: event.name.text,

      // Add button to the end of the header which opens event url
      headerRight: () => (
        /*<Button
          title='Open'
          onPress={ () => Linking.openURL(event.url) }
        />*/
        <View style={styles.iconContainer}>
          <Icon type="ionicon" name='open-outline' color='#147EFB' onPress={ () => Linking.openURL(event.url) } />
        </View>
      )
    })
  }, [props.navigation])

  return (
    <View style={ styles.view }>
      <View style={ styles.webviewContainer }>
        <WebView originWhitelist={ ['*'] } source={{ html: event.description.html }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },

  webviewContainer: {
    height: '100%',
    width: '100%'
  },

  iconContainer: {
    paddingRight: 12
  }
})

export default Detail
