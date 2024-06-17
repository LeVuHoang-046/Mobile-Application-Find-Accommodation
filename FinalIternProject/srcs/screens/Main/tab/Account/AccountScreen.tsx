import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, View ,TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import React from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigateParamList } from "../../../../navigate/types";
import navigatetoLogOut from '../../../../navigate/NavigatetoLogOut'
import { ShadowStyle } from "../../../../constants/ShadowStyle";

interface Props {
  navigation: StackNavigationProp<NavigateParamList>;
}

const { width: screenWidth } = Dimensions.get('window')
interface SettingItem {
  icon: string;
  text: string;
  action: () => void;
  subicon: string;
}

 export const AccountScreen = ({ navigation }: Props)=> {
  const NavigateToManaPost1 = ()=>{
    navigation.navigate("NavigateToManaPostScreen")
  }

  const NavigatetoManaServiceOr = ()=>{
    navigation.navigate("NavigatetoManaServiceOr")
  }

  const NavigatetoAppointmentSchedule = ()=>{
    navigation.navigate("NavigatetoAppointmentSchedule")
  }

  const NavigatetoBills = ()=>{
    navigation.navigate("NavigatetoBills")
  }

  const NavigatetoContracts = ()=>{
    navigation.navigate("NavigatetoContracts")
  }

  const NavigatetoLikedPost = ()=>{
    navigation.navigate("NavigatetoLikedPost")
  }

  const NavigatetoTermPolicies = ()=>{
    navigation.navigate("NavigatetoTermPolicies")
  }

  const NavigatetoReportProblem = ()=>{
    navigation.navigate("NavigatetoReportProblem")
  }
  

  
  
  
  const SettingItems: SettingItem[] = [
    {icon:"post", text:"Manage Post", action: NavigateToManaPost1,subicon:"chevron-right"},
    {icon:"cart-variant", text:"Manage service orders", action: NavigatetoManaServiceOr,subicon:"chevron-right"},
    {icon:"calendar-clock-outline", text:"Appointment schedule",action: NavigatetoAppointmentSchedule,subicon:"chevron-right"},
    {icon:"credit-card-check-outline", text:"Bills", action: NavigatetoBills,subicon:"chevron-right"},
    {icon:"script-text-outline", text:"Contracts", action: NavigatetoContracts,subicon:"chevron-right"},
    {icon:"cards-heart-outline", text:"Liked post", action: NavigatetoLikedPost,subicon:"chevron-right"},
    {icon:"file-lock-outline", text:"Term & policies", action: NavigatetoTermPolicies,subicon:"chevron-right"},
    {icon:"alert-rhombus-outline", text:"Report a problem", action: NavigatetoReportProblem,subicon:"chevron-right"},
    {icon:"logout", text:"Log out", action: navigatetoLogOut,subicon:"chevron-right"}
  ]

  const RenderSettingItems: React.FC<SettingItem> = ({icon, text, action,subicon}) => {
    return (
      <View style={{marginTop:10}}>
        <TouchableOpacity onPress={action} style={{
          flexDirection:'row',
          alignItems:'center',
          paddingVertical:10,
          paddingHorizontal:15,
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CommunityIcon name={icon} size={30} color={'#000'}/>
              <Text style={{
                fontSize:16,
                marginLeft:20,
                color:'#000'
              }}
              >{text}</Text>
  
            </View>
            <CommunityIcon name={subicon} size={30} color={'#000'} style={{alignContent:'flex-end'}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle='dark-content' translucent={true} />
        <ScrollView contentContainerStyle={{ height: 1000 }}>
        {/* ============= HEADER ================== */}
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              
              <View style={{position:'absolute',top:15, right:15}}>
                <TouchableHighlight>
                  <MaterialIcon name="settings" size={30} color={'#000'}/>
                </TouchableHighlight>
              </View>

                <View style={styles.subHeader}>
                    {/* ======ACTIVE WALLET====== */}
                    <View style={styles.subHeaderItem1}>
                        <TouchableOpacity  style={styles.buttonHead1}>
                            <Text style={styles.buttonHText1}>Active Wallet</Text>
                        </TouchableOpacity>
                    </View>
                    {/* =============SWITCH ACCOUNT============== */}
                    <View style={styles.subHeaderItem2}>
                        <View style={{flex:0.18}}>
                          <TouchableOpacity>
                              <View>
                                  <CommunityIcon name="headset" size={24} color={'#ffffff'} style={{ marginTop: 10, position:'absolute', alignSelf:'flex-start' }} />
                              </View>
                          </TouchableOpacity>
                        </View>

                        <View style={{flex:0.82}}>
                          <TouchableOpacity  style={styles.buttonHead2}>
                              <Text style={styles.buttonHText2}>Switch Account</Text>
                              <MaterialIcon name="sync" size={22} color={'red'} style={{marginLeft:5}}/>
                          </TouchableOpacity>
                        </View>
                    </View>
                    {/* =============END SWITCH ACCOUNT============== */}

                </View>
            </View>
          </View>
          {/* ============= END HEADER ================== */}
          <View style={{ marginHorizontal: 15, position: 'absolute', width: '100%', height: '100%' }}>
            {/* ===================== START ACCOUNT BOARD ==================== */}
            <View style={[styles.accountBoard,ShadowStyle]}>
              <TouchableOpacity activeOpacity={1} style={styles.accountButton}>
                
                <Text>Info account</Text>
              </TouchableOpacity>
            </View>
            {/* ===================== END ACCOUNT BOARD ==================== */}
            
            {/* ===================== START SETTING ITENS ==================== */}
            <View style={[styles.settingBoard,ShadowStyle]}>
              {SettingItems.map((item,index)=>(
                <React.Fragment key={index}>
                  {RenderSettingItems(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: 200,
    width: screenWidth,
    justifyContent: 'center', // align subHeader vertically
  },
  subHeader: {
    height: 50,
    width: screenWidth-30,
    flexDirection: 'row', 
    marginHorizontal:15,
    
    
    
  },
  subHeaderItem1: {
    flex:0.4,
    justifyContent:'center',
  
    
  },
  subHeaderItem2: {
    flex:0.6,
    justifyContent:'center',
    marginLeft:'15%',
    flexDirection:'row',
    

    
  },
  buttonHead1: {
    width: 130,
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    borderStyle:'dashed',
    borderWidth:3,
    borderColor:'#ffffff',
   
  },
  buttonHead2: {
    width:'100%',
    height: '70%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center', 
    alignSelf:'flex-end',
    marginTop:10,
    paddingTop:4,
    flexDirection:'row'
    
    
    
  },
  buttonHText1: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft:10,
    fontWeight:'bold'
  },
  buttonHText2: {
    fontSize: 16,
    color: 'red',
    marginLeft:5,
    fontWeight:'bold',
    justifyContent:'center'
    

  },
  //==========================END HEADER=======================
  
  //==========================START ACCOUNT BOARD====================
  accountBoard: {
    width: screenWidth - 30,
    height: 80,
    backgroundColor: '#ffffff',
    marginTop: 160,
    borderRadius: 20
  },
  accountButton: {
    backgroundColor: '#ACE2E1',
    zIndex: 1,
    borderRadius: 15,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //========================= END ACCOUNT BOARD======================

  //========================= START SETTING BOARD=====================
  settingBoard:{
    width: screenWidth - 30,
    height:570,
    backgroundColor: '#ffffff',
    marginTop: 15,
    borderRadius: 20,
    
  }
})
