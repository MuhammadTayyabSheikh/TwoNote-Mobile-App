import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';

function SingleNote({ item, index, currentIndex, setIndex, renderRightActions, renderLeftActions }) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions} >
        <View key={item.category + index} style={styles.cardContainer}>
          <View View style={[styles.card]}>
            <TouchableOpacity
              onPress={() => {
                setIndex(index === currentIndex ? null : index);
              }}
              style={styles.cardContainer}
            >
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>


            {index === currentIndex && (
              <View style={styles.body}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>
                    {`${item.category}`}
                  </Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.content}>
                    {item.content}
                  </Text>
                </View>
                <View style={styles.footer}>
                  <AppText style={styles.date}>
                    Last Updated On - {dayjs(item.updateAt).format('DD/MM/YYYY')}
                  </AppText>
                </View>
              </View>
            )}
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexGrow: 1,
    marginBottom: 10,
    overflow: 'hidden',
    width: "100%",
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.tershary,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    color: colors.white,
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    width: "100%",
  },
  headingContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    width: '100%',

  },
  heading: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '400',
  },
  headingButtons: {
    flexDirection: 'row'
  },
  body: {
    backgroundColor: colors.tershary1,
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    position: "relative",
    top: 0,
    left: 0
  },
  category: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 10,
  },
  content: {
    color: colors.white,
    fontSize: 18
  },
  footer: {
    paddingBottom: 10,
    color: colors.quaternary,
    position: "absolute",
    top: 10,
    right: 10,
  },
  date: {
    color: colors.quaternary,
    fontSize: 12,
  }
})

export default SingleNote;