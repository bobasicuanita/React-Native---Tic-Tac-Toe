import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import GameScreen from './src/screens/GameScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Provider as StatsProvider } from './src/context/StatsContext';
import { Provider as SettingsProvider } from './src/context/SettingsContext';

const bottomTabNavigator = createBottomTabNavigator({
  Game: GameScreen,
  Statistics: StatisticsScreen,
  Settings: SettingsScreen
},{
  tabBarOptions:{
    showIcon: true,
    activeTintColor: '#fff',
    inactiveTintColor: '#000',
    tabStyle:{
      paddingVertical: 5
    },
    style: {
      backgroundColor: '#2193b0',
    }
  }
});

const App =  createAppContainer(bottomTabNavigator);

export default () => {
  return <StatsProvider>
      <SettingsProvider>
          <App />
      </SettingsProvider>
    </StatsProvider>
};