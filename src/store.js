import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './redux/reducers/userReducers';
import {
  notesListReducer,
  noteCreateReducer,
  noteUpdateReducer,
  noteDeleteReducer
} from './redux/reducers/notesReducer';
import storage from './utilities/storage';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  notesList: notesListReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
});

const userInfoFromStorage = storage.getItem('userInfo') ? storage.getItem('userInfo') : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = configureStore({ reducer: reducer, preloadedState: initialState, middleware: (middleware) });


export default store;