import AppEntry from "./AppEntry";
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./src/store"

export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  )
}