import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Event = (props) => {
  let options = { weekday: 'long', month: 'long', day: 'numeric' }
  let localDate = new Date(props.date)

  return (
    <View style={ styles.item }>
      <Image source={{ uri: props.image }} style={ styles.image } />
      <View style={ styles.eventMeta }>
        <Text style={ styles.eventName }>{ props.name }</Text>
        <Text style={ styles.eventDate }>{ localDate.toLocaleDateString('en-US', options) }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  image: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  eventMeta: {
    flexDirection: 'column',
    padding: 15
  },

  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  eventDate: {
    paddingTop: 4
  }
})

export default Event
