import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import Calendar from './Calendar';
import List from './List';
import logo from './assets/todoLogo.png';
import SplashScreen from 'react-native-splash-screen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class HomeScreen extends React.Component {
  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
        <View style={styles.container}>
          <Image source={logo} style={{width: '80%', resizeMode: 'contain'}}/>
          <View style={styles.textContainer}>
            <Text style={styles.welcome}>Keep track of your todo list and stay organized</Text>
            <Text style={styles.instructions}>To get started, click on List and add an item to your todo list</Text>
            <Text style={styles.instructions}>To see a calendar, click on Calendar</Text>
          </View>
        </View>
    );
  }
}

const AppNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  List: List,
  Calendar: Calendar
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = 'md-home';
          } else if (routeName === 'Calendar') {
            iconName = 'md-calendar';
          }
          else if(routeName === 'List'){
            iconName = 'md-checkmark-circle-outline'
          }
          return <Icon name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#53783a',
        style: {
          backgroundColor: '#a8d08d',
        }
      },
      navigationOptions: {
        title: '//TODO'
      },
    });
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingBottom: 50
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
