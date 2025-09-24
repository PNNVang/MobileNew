import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddStudentScreen from './src/screens/AddStudentScreen';
import EditStudentScreen from './src/screens/EditStudentScreen';

// Tạo ra một navigator kiểu ngăn xếp
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'QUẢN LÝ SINH VIÊN',
                  headerStyle: {
                    backgroundColor: '#2196F3', // Màu nền header
                  },
                  headerTintColor: '#fff', // Màu chữ và icon
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 20,
                  },
                  headerTitleAlign: 'center', // Căn giữa title
                }}
              />
              <Stack.Screen
                name="AddStudentScreen"
                component={AddStudentScreen}
                options={{
                  title: 'THÊM SINH VIÊN', // Tiêu đề cho màn hình
                  headerShown: true, // Hiện header với nút back tự động
                     headerStyle: {
                         backgroundColor: '#2196F3',
                     },
                     headerTintColor: '#fff',
                         headerTitleStyle: {
                         fontWeight: 'bold',
                         fontSize: 20,
                      },
                      headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen
                name="EditStudentScreen"
                component={EditStudentScreen}
                  options={{
                  title: 'CẬP NHẬT SINH VIÊN',
                  headerShown: true,
                  headerStyle: {
                        backgroundColor: '#2196F3',
                  },
                  headerTintColor: '#fff',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                      },
                      headerTitleAlign: 'center',
                  }}
                />
          </Stack.Navigator>
        </NavigationContainer>
  );
};

export default App;