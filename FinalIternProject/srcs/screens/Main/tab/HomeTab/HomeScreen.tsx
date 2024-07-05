import React,{Component, useState, useEffect, useRef} from "react";
import { Animated, Dimensions, Image, Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { StackNavigationProp } from "@react-navigation/stack";

import LinearGradient from "react-native-linear-gradient";
import { NavigateHomeScreenParamList } from "../../../../navigate/types";
import { ShadowStyle } from "../../../../constants/ShadowStyle";
import { Images } from "@assets";
interface ImageItem {
    image: JSX.Element; 
  }
interface OptionItem{
    icon:string;
    text: string;
    action: ()=> void
}

interface DistrictItem{
    image: any,
    text: string;
    action: ()=> void
}

const{width: screenWidth} = Dimensions.get('window')
// ============NAVIGATE SETUP===============
interface Props {
    navigation: StackNavigationProp<NavigateHomeScreenParamList>;
}

 export const HomeScreen = () => {

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
            image: <Image style={styles.slide} source={Images.bgImg1} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={Images.bgImg2} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={Images.bgImg3} resizeMode='stretch'/>

        },
        {
            image: <Image style={styles.slide} source={Images.bgImg4} resizeMode='stretch'/>

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
            // const currentOffset = nativeEvent.contentOffset.x;
            if(nativeEvent.contentOffset.x > 0) {
                let imageIndex = 0;
                imageIndex = Math.floor(nativeEvent.contentOffset.x + screenWidth / 2) / screenWidth;
            }
        }
        
    }
    const AnimatedScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false })


//==============================  END SLIDER ===================================================

//==============================  START LIST OPTION ===================================================
   
    const OptionItems: OptionItem[] = [
        {icon:'location-sharp', text:'Nearby rooms', action: NavigateNearbyRoom },
        {icon:'location-sharp', text:'Room posts', action: NavigateFindPostScreen }, //change action
        {icon:'location-sharp', text:'Share room post', action: NavigateNearbyRoom }, // change action
        {icon:'location-sharp', text:'Transport', action: NavigateTransportService },
        {icon:'location-sharp', text:'Gas serviece', action: NavigateGasService },
        {icon:'location-sharp', text:'Water container', action: NavigateWaterService },
        {icon:'location-sharp', text:'Laudry', action: NavigateLaudryService },
        {icon:'location-sharp', text:'Repair service', action: NavigateRepairService },
        {icon:'location-sharp', text:'Design room service', action: NavigateDesignRoomService },

    ]

    const RenderOptionItems: React.FC<OptionItem> = ({icon,text,action})=>{
        return(
            <TouchableOpacity onPress={action} style={styles.OptionContainer}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Icon name={icon} size={30} color={'#000'} style={{paddingBottom:5}}/>
                    <Text style={{fontSize:14,textAlign:'center'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
//==============================  END LIST OPTION ===================================================



//==============================  START DISTRICT BOARD SETUP ===================================================
    const DistrictItems: DistrictItem[] = [
        {image: Images.imageBaDinh,
        text:'Ba Đình',action:NavigateDesignRoomService},
        {image: Images.imageCauGiay,
        text:'Cầu Giấy',action:NavigateDesignRoomService},
        {image: Images.imageDongDa,
        text:'Đống Đa',action:NavigateDesignRoomService},
        {image: Images.imageThanhXuan,
        text:'Thanh Xuân',action:NavigateDesignRoomService},
        {image: Images.imageHaiBaTrung,
        text:'Hai Bà Trưng',action:NavigateDesignRoomService},
        {image: Images.imageHoangMai,
        text:'Hoàng Mai',action:NavigateDesignRoomService},
        {image: Images.imageNamTuLiem,
        text:'Nam Từ Liêm',action:NavigateDesignRoomService},
        {image: Images.imageTayHo,
        text:'Tây Hồ',action:NavigateDesignRoomService},
        {image: Images.imageLongBien,
        text:'Long Biên',action:NavigateDesignRoomService},
        {image: Images.imageHoanKiem,
        text:'Hoàn Kiếm',action:NavigateDesignRoomService},
        {image: Images.imageThanhTri,
        text:'Thanh Trì',action:NavigateDesignRoomService},
        {image: Images.imageBacTuLiem,
        text:'Bắc Từ Liêm',action:NavigateDesignRoomService},
        {image: Images.imageHaDong,
        text:'Hà Đông',action:NavigateDesignRoomService},
    ]

    const RenderDistrictItems: React.FC<DistrictItem> = ({image,text,action})=>{
        return(
            <TouchableOpacity onPress={action} style={styles.DistrictContainer}>
                <View style={styles.imageDistrictContainer}>
                    <Image resizeMode='cover'  source={image} style={styles.imageDistrict}/>
                    <LinearGradient 
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']}
                    style={{position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,}}/>
                    <Text style={{
                        fontSize:20,textAlign:'center',
                        position:'absolute',color:'#ffffff',
                        fontWeight:'bold', bottom:0,right:0,
                        left:0,marginBottom:20,
                        textShadowColor: 'rgba(0, 0, 0, 0.7)',
                        textShadowRadius: 10}}>{text}</Text>
                    
                </View>
            </TouchableOpacity>
        )
    }
//==============================  END DISTRICT BOARD SETUP ===================================================


    
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
            <SafeAreaView>
                <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true}/>
                <Modal
                animationType='fade'
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
            </SafeAreaView>
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
                            contentContainerStyle={{backgroundColor:'#ffffff',height:150, width:1000}}>
                                <View style={[styles.OptionItemsContainer]}>
                                    {OptionItems.map((item,index)=>(
                                    <React.Fragment key={index}>
                                    {RenderOptionItems(item)}
                                    </React.Fragment>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>

                    {/* ============================ DISTRICT BOARD ============================ */}
                    <View style={styles.DisBoard}>
                        <View style={{backgroundColor:'#EEEEEE', padding:15}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color:'#000'  }}>Find Out</Text>

                        </View>

                        <View>
                            <ScrollView
                            horizontal
                            contentContainerStyle={{backgroundColor:'pink',height:'100%', width:2340}}>
                                <View style={[styles.DistrictItemsContainer]}>
                                    {DistrictItems.map((item,index)=>(
                                    <React.Fragment key={index}>
                                    {RenderDistrictItems(item)}
                                    </React.Fragment>
                                    ))}
                                </View>
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
    // =============================LIST OPTION STYLE=====================
    ListOpt:{
        flex: 1,
        // justifyContent:'center',
        marginHorizontal:15
    },
    OptionContainer:{
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        marginHorizontal:5,
        borderRadius: 15,
        width:80,
        height:100,
    },
    OptionItemsContainer:{
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flexDirection: 'row',
        height:'100%'
        
    },
    // =============================DISTRICT BOARD STYLE=====================

    DistrictContainer:{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal:15,
        marginVertical:10,
        borderRadius: 20,
        width:150,
        height:200,
       

    },
    DistrictItemsContainer:{
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        height:'100%',
      
    },
    imageDistrictContainer:{
        justifyContent:'center',
        overflow:'hidden',
        width:150,
        height:200,
        borderRadius:20,
        
    },

    imageDistrict:{
        width:150,
        height:200,
        borderRadius:20,
        position:'absolute'
       

      
        
    },
// ===============================================
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



// export default HomeScreen;