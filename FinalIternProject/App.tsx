import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './srcs/component/index.tsx';
import TopbarManaServiceOr from "./srcs/viewpager/TopbarManaServiceOr.tsx";
import HomeViewpager from "./srcs/viewpager/HomeViewpager.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <>
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name="RootStack" component={RootStack}/>
      </Stack.Navigator>
      {/* <TopbarManaServiceOr/> */}
    </NavigationContainer>
    </>
  )
};

export default App;