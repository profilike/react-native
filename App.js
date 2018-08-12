import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

// Register Screens
Navigation.registerComponent('awesome-places.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('awesome-places.SharePlaceScreen', () => SharePlace, store, Provider);
Navigation.registerComponent('awesome-places.FindPlaceScreen', () => FindPlace, store, Provider);
Navigation.registerComponent('awesome-places.PlaceDetailScreen', () => PlaceDetail, store, Provider);
Navigation.registerComponent('awesome-places.SideDrawer', () => SideDrawer);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});
