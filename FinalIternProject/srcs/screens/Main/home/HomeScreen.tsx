import React,{Component, useState, useEffect, useRef} from "react";
import { Animated, Dimensions, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ShadowStyle } from "../../../constants/ShadowStyle";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigateHomeScreenParamList } from "../../../navigate/types";
interface ImageItem {
    image: JSX.Element; 
  }
const{width: screenWidth} = Dimensions.get('window')
// ============NAVIGATE SETUP===============
interface Props {
    navigation: StackNavigationProp<NavigateHomeScreenParamList>;
}

const HomeScreen = ({ navigation }: Props) => {
    //==============================  START NAVIGATE ===================================================
    const NavigateNotification = () => {
        navigation.navigate("NavigateNotification");
    }
    const NavigateFindPostScreen = ()=>{
        navigation.navigate("NavigateFindPostScreen");
    }

    // ===============MODAL SETUP==================================================
    const [modalVisible, setModalVisible] = useState(false)

    //==============================  START SLIDER ===================================================
    const scrollY = new Animated.Value(0);
    const stickyTop = scrollY.interpolate({
        inputRange:[245,265],
        outputRange:[-265,0],
        extrapolate:'clamp'
    })
    const stickyOpacity = scrollY.interpolate({
        outputRange: [0, 1],
        inputRange: [225, 275],
        extrapolate: 'clamp'
      })

    const[imageList, SetImageList]= useState<ImageItem[]>([]);
    const StepCarousel = useRef<ScrollView>(null); 

    useEffect(() =>{
        //load data tu sever
        const data = [
            {
            image: <Image style={styles.slide} source={require('../../../../assets/img/img1.jpg')} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={require('../../../../assets/img/img2.jpg')} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={require('../../../../assets/img/img3.jpg')} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={require('../../../../assets/img/img4.jpg')} resizeMode='stretch'/>

        },
        ];
        SetImageList(data);
    },
    []);

    useEffect(()=>{
        if(imageList.length > 0 && StepCarousel.current) {
            let index = 0;
            const intervalId = setInterval(()=>{
                StepCarousel.current?.scrollTo({x: index * screenWidth,y: 0 , animated: true});
                index += 1;
                if(index === imageList.length){
                    index = 0;
                }
            },3000); // 3 seconds
            return () => clearInterval(intervalId);
        } 
    },[imageList, screenWidth])

    const HandleScroll = (e: { nativeEvent?: any; }) =>{
        if(!e || !e.nativeEvent) {
            return;
        }
        const{ nativeEvent} = e;
        if (nativeEvent && nativeEvent.contentOffset){
            const currentOffset = nativeEvent.contentOffset.x;
            let imageIndex = 0;
            if(nativeEvent.contentOffset.x > 0) {
                imageIndex = Math.floor(nativeEvent.contentOffset.x + screenWidth / 2) / screenWidth;
            }
        }
        
    }
    const AnimatedScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false })


//==============================  END SLIDER ===================================================
    
// ========================== BEGIN =======================================================
    return(
    <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="transparent" barStyle='dark-content' translucent={true}/>
                {/* ============= HEADER ================== */}
        <View style={{flex:1,backgroundColor:'#EEEEEE'}}>
            {/* ======================== START ANIMATED SEARCH BOARD=================== */}
            <Animated.View style={[styles.AnimatesearchBarContainer,{top:stickyTop, opacity: stickyOpacity}]}>
                                      
                <View style={styles.subsearchBar}>

                    <TouchableOpacity onPress={()=> setModalVisible(true)} activeOpacity={1} style={{backgroundColor:'#ACE2E1',position:'absolute',zIndex:1, borderRadius:15, width:'31%',height:'100%', flexDirection:'row'}}>
                        <Icon name='location-sharp' size={25} color='#fff' style={{marginTop:10,marginLeft:10}}></Icon>
                        <Text style={{alignSelf:'center',paddingLeft:8, textAlign:'center', fontSize:16}}>Hà Nội</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={NavigateFindPostScreen} activeOpacity={1} style={{backgroundColor:'#EEEEEE', borderRadius:15,marginLeft:'20%', width:'70%', height:'100%'}}>
                        <Text style={{fontSize:14, marginLeft:50,textAlign:'left', marginTop:13 }}>Find Postings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={NavigateNotification} activeOpacity={1} style={{marginLeft:7,marginTop:3}}>
                        <Icon name="notifications" size={35} color="#ccc" />
                    </TouchableOpacity>
                                        
                </View>

            </Animated.View>
            {/* ======================== END ANIMATED SEARCH BOARD=================== */}

            {/* ======================== START MODAL SEARCH BOARD=================== */}
            <View>
                <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=> setModalVisible(false)}>
                        <TouchableOpacity onPress={()=> setModalVisible(false)} style={styles.modalContainer}>
                            
                            <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                                
                                <View style={{ 
                                    height: 50,width:'100%', 
                                    backgroundColor: '#ffffff',
                                    alignItems:'center' }}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>City</Text>
                                </View>
                                <View style={{
                                    height:160,
                                    width:'100%'}}>
                                    <ScrollView contentContainerStyle={{ height: 1000, backgroundColor: 'red' }}>
                                    
                                    </ScrollView>

                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                </Modal>
            </View>
            {/* ======================== END MODAL SEARCH BOARD=================== */}


            
            <ScrollView 
            contentContainerStyle={{height:2000}}
            scrollEventThrottle={16}
            bounces={false}
            showsVerticalScrollIndicator={false}
            onScroll={AnimatedScroll}>
                <View style={{}}>
                    <View style={styles.container}>

                        <ScrollView 
                        horizontal 
                        pagingEnabled
                        onScroll={HandleScroll}
                        ref={StepCarousel} // set the name of the scrollView
                        contentContainerStyle={{ width: screenWidth * imageList.length, height:200}}>
                            {imageList.map((e, index )=>
                                <View key={index.toString()}>
                                    {e.image}
                                </View>
                            )}

                        </ScrollView>
                        <TouchableOpacity onPress={NavigateNotification} activeOpacity={0} style={styles.notiIcon}>
                                <Icon name="notifications" size={35} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                        {/* ============= END HEADER ================== */}

                <View style={{marginHorizontal:15, position:'absolute', width:'100%',height:'100%'}}>

                    {/* ===================== START SEARCH BOARD ==================== */}
                    <View style={[styles.searchBoard,ShadowStyle]}>
                        <View style={styles.searchBar}>
                            <TouchableOpacity onPress={()=> setModalVisible(true)} activeOpacity={1} style={{backgroundColor:'#ACE2E1',position:'absolute',zIndex:1, borderRadius:15, width:'31%',height:'100%', flexDirection:'row'}}>
                                <Icon name='location-sharp' size={25} color='#fff' style={{marginTop:10,marginLeft:10}}></Icon>
                                <Text style={{alignSelf:'center',paddingLeft:8, textAlign:'center', fontSize:16}}>Hà Nội</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={NavigateFindPostScreen} activeOpacity={1} style={{backgroundColor:'#EEEEEE', borderRadius:15,marginLeft:'20%', width:'80%', height:'100%'}}>
                                <Text style={{fontSize:14, marginLeft:50,textAlign:'left', marginTop:13 }}>Find Postings</Text>
                            </TouchableOpacity>
                                    
                        </View>
                        {/* ===================== END SEARCH BOARD ==================== */}
                    
                        {/* ========================== LIST OPTION =============================== */}

                        <View style={styles.ListOpt}>
                            <ScrollView
                            horizontal
                            contentContainerStyle={{backgroundColor:'red',height:90, width:1000}}>

                            </ScrollView>
                        </View>
                    </View>

                    {/* ============================ DISTRICT BOARD ============================ */}
                    <View style={styles.DisBoard}>
                        <View style={{backgroundColor:'#ffff', padding:15}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color:'#000'  }}>Find Out</Text>

                        </View>

                        <View>
                            <ScrollView
                            horizontal
                            contentContainerStyle={{backgroundColor:'pink',height:150, width:1000}}>
                                
                            </ScrollView>
                        </View>
                    </View>
                    {/* ============================ END DISTRICT BOARD ============================ */}
                    
                    {/* ============================ START LOW-COST BOARD ============================ */}

                    <View style={[styles.LowCostBoard,ShadowStyle]}>
                        <View style={{backgroundColor:'#ffff', padding:15,}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color:'#000'  }}>Low-cost</Text>

                        </View>

                        <View>
                            <ScrollView
                            contentContainerStyle={{backgroundColor:'pink',height:800}}>
                                
                            </ScrollView>
                        </View>
                    </View>
                </View>               
            </ScrollView>
        </View>

        
    </SafeAreaView>

    )
};

//==================================== STYLES ==================================================
const styles = StyleSheet.create({
    slide:{
        width: screenWidth,
        height: '100%'
    },
    container:{
        width: screenWidth,
        height: 200,
        
    },
    notiIcon:{
        position:'absolute',
        top: 40,
        right: 15
    },
    searchBoard:{
        width: screenWidth-30 ,
        height: 220,
        backgroundColor: '#ffffff',
        marginTop: 160,
        borderRadius:15,
  

    
    },
    searchBar:{
        height: 45,
        margin:20,
        flexDirection:'row',
    },
    AnimatesearchBarContainer:{
        backgroundColor:'#ffffff',
        position:'absolute',
        paddingTop:24,
        right:0,
        left:0,
        zIndex:1,
        opacity:1
    },
// ====================MODAL STYLES================
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        height: 250,
        width: 300,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        zIndex:1
    },

    subsearchBar:{
        height: 45,
        margin:15,
        flexDirection:'row',
       
    },
    ListOpt:{
        flex: 1,
        // justifyContent:'center',
        marginHorizontal:15
    },
    DisBoard:{
        height:250,
        backgroundColor:'red',
        marginVertical: 20,
        width:screenWidth-30,
        borderRadius:15
    },
    LowCostBoard:{
        height:250,
        backgroundColor:'red',
        marginVertical: 20,
        width:screenWidth-30,
        borderRadius:15
    },
})



export default HomeScreen;