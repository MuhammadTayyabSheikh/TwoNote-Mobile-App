import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { useDispatch, useSelector } from "react-redux";

import MainScreen from '../components/MainScreen';
import Screen from '../components/Screen';
import AnimatedLottieView from 'lottie-react-native';
import SingleNote from '../components/SingleNote';
import NoteDeleteAction from '../components/NoteDeleteAction';
import NoteEditAction from '../components/NoteEditAction';
import routes from '../navigation/routes';
import ActivityIndicator from '../components/ActivityIndicator';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { deleteNoteAction, listNotes } from '../redux/actions/notesActions';
import AuthNavigator from '../navigation/AuthNavigator';
import storage from '../utilities/storage';
import axios from 'axios';

// const notes = null;

const notes = [
  {
    title: "Note 1",
    content: "N1 des",
    category: "N1 categ"
  },
  {
    title: "Note 2",
    content: "N2 des",
    category: "N2 categ"
  },
  {
    title: "Note 3",
    content: "N3 des",
    category: "N3 categ"
  },
  {
    title: "Note 4",
    content: "N4 des",
    category: "N4 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des",
    category: "N5 categ"
  },
  {
    title: "Note 5",
    content: "N5 des nmmmmmmmm mmmm mm mm mmmmm mmmm mmmm mmmm mmmmm mmm m    m m m m m m m mmmmmj hhhhh hyiuh j 89ihui n8ui 87ui jk78uj78iukjhnuikjhnuijkhnujhn",
    category: "N5 categ"
  },
];

const transition = (
  <Transition.Together>
    {/* <Transition.In type='fade' durationMs={100} /> */}
    {/* <Transition.Change /> */}
    {/* <Transition.Out type='fade' durationMs={100} /> */}
  </Transition.Together>
);

export default function MyNotes({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);

  const { loading, notes, error } = notesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    Alert.alert("Delete", "Are you sure want to delete this note?", [
      { text: 'No' },
      { text: 'Yes', onPress: () => dispatch(deleteNoteAction(id)) },
    ]);
  };

  const editHandler = (id) => {
    const fetching = async () => {
      const { data } = await axios.get(`https://two-note-backend.herokuapp.com/api/notes/${id}`);
      const item = { _id: data._id, title: data.title, category: data.category, content: data.content };
      navigation.navigate(routes.EDIT_NOTE, item)
    }
    fetching();
  }

  useEffect(() => {
    setRefreshing(true);
    dispatch(listNotes());
    setRefreshing(false);
    console.log("MyNotes", "\n\n", notes);
  }, [dispatch, navigation, successCreate, userInfo, successUpdate, successDelete,]);

  useEffect(() => {
    if (error)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });

  }, [error]);

  useEffect(() => {
    if (errorDelete)
      showMessage({
        message: "Error Occurred: ",
        content: error,
        type: "danger",
      });

  }, [errorDelete]);

  useEffect(() => {
    if (successDelete)
      showMessage({
        message: "Note Deleted Successfully!",
        type: "success",
      });
  }, [successDelete]);

  return (
    <>
      <ActivityIndicator visible={loading || loadingDelete} animation={require("../assets/animations/person1.json")} />
      <Screen style={styles.screen}>
        <FlashMessage floating animationDuration={700} />
        <MainScreen
          heading="Notes"
          iconName={"clipboard-text-search-outline"}
          iconVisible={true}
          query={query}
          handleSearch={(que) => setQuery(que)}
        >
          {!(notes && Object.keys(notes).length === 0 && Object.getPrototypeOf(notes) === Object.prototype) && notes
            ?
            <Transitioning.View
              ref={ref}
              transition={transition}
              style={styles.container}
            >
              <FlatList
                data={notes?.filter((filteredNote) => {
                  return (
                    filteredNote.title.toLowerCase().includes(query.toLowerCase()) ||
                    filteredNote.category.toLowerCase().includes(query.toLowerCase()) ||
                    filteredNote.content.toLowerCase().includes(query.toLowerCase())
                  )
                }
                ).reverse()}
                keyExtractor={item => item.title.toString() + (Math.random() * 5).toString()}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={() => {
                  dispatch(listNotes());
                }}
                renderItem={({ item, index }) => (
                  <SingleNote
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                    setIndex={(ind) => setCurrentIndex(ind)}
                    renderRightActions={(index) =>
                      <NoteDeleteAction onPress={() => { deleteHandler(item._id) }} large={index == currentIndex} />
                    }
                    renderLeftActions={() =>
                      <NoteEditAction onPress={() => editHandler(item._id)} />
                    }
                  />
                )}
              />
            </Transitioning.View>
            :
            <AnimatedLottieView
              id="firstLottie"
              // autoPlay
              source={require("../assets/animations/nothing_found1.json")}
            />
          }
        </MainScreen>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  container: {
    alignItems: "baseline",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: "hidden",
  },
});