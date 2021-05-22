//import liraries
import React, { Component } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ResturantList from './src/pages/RestaurantList';
import RestaurantDetails from './src/pages/RestaurantDetails';

const Stack = createStackNavigator();

// create a component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RestaurantList"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="RestaurantList" component={ResturantList} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;