import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, TouchableOpacity, FlatList, View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';
