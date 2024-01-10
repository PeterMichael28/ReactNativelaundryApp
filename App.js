import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { Provider } from 'react-redux'
import { store } from './store/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
   <Navigation />
   <Toast />
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
