import { View, Text, StyleSheet, SafeAreaView, Animated, Image, Keyboard, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/globalUi/customSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import { Colors, lightColors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import LinearGradient from 'react-native-linear-gradient'
import CustomInput from '@components/ui/CustomInput'
import CustomButton from '@components/ui/CustomButton'
import { customerLogin } from '@services/authService.ts' 
import Icon from 'react-native-vector-icons/MaterialIcons'

const bottomColors = [...lightColors].reverse()

const CustomerLogin = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [gestureSequence, setGestureSequence] = useState<string[]>([])
    const animatedValue = useRef(new Animated.Value(0)).current
    const keyboardoffsetHeight = useKeyboardOffsetHeight()

    const handelGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent
            let direction = ''
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left'
            } else {
                direction = translationY > 0 ? 'down' : 'up'
            }

            const newSequence = [...gestureSequence, direction].slice(-5)
            setGestureSequence(newSequence)

            console.log("newSequence", newSequence)

            if (newSequence?.join(' ') === 'up up down left right') {
                setGestureSequence([])
                resetAndNavigate("DeliveryLogin")
            }
        }
    }

    const handelAuth = async() =>{
        Keyboard.dismiss()
        setLoading(true)
        try {
            await customerLogin(phoneNumber)
           resetAndNavigate('ProductDashboard')
            
        } catch (error) {
            console.log("error",error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {

        console.log(animatedValue,"keyboardoffsetHeight",keyboardoffsetHeight)

        if (keyboardoffsetHeight === 0) {

            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
                
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: - keyboardoffsetHeight * 0.84,
                duration: 1000,
                useNativeDriver: true
                
            }).start()
        }
    }, [keyboardoffsetHeight])

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />

                    <PanGestureHandler onHandlerStateChange={handelGesture}>
                        <Animated.ScrollView
                            bounces={false}
                            style={{ transform: [{ translateY: animatedValue }] }}
                            keyboardDismissMode="on-drag"
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={styles.subContiner}>

                            <LinearGradient colors={bottomColors}
                                style={styles.gradient}
                            />
                            <View style={styles.content}>
                                <Image
                                    source={require('@assets/images/logo.png')}
                                    style={styles.logo}
                                />
                                <CustomText
                                    variants='h2'
                                    fontFamily={Fonts.Bold}
                                >
                                    Grocery Delivery App
                                </CustomText>

                                <CustomText
                                    variants='h5'
                                    fontFamily={Fonts.SemiBold}
                                    style={styles.text}
                                >
                                    Login or signup
                                </CustomText>

                                <CustomInput
                                    onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                                    onClear={() => setPhoneNumber('')}
                                    value={phoneNumber}
                                    placeholder='Enter Mobile Number'
                                    inputMode='numeric'
                                    left={<CustomText
                                        style={styles.phoneText}
                                        variants='h6'
                                        fontFamily={Fonts.SemiBold}
                                    > +91 </CustomText>}
                                />

                                <CustomButton 
                                  disable={phoneNumber.length != 10}
                                  onPress={()=>handelAuth()}
                                  loading={loading}
                                  title='Continue'
                                />
                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>
                </CustomSafeAreaView>

                <View style={styles.footer}>
                    <SafeAreaView />
                    <CustomText fontSize={RFValue(6)}>
                        By Contuning, you agree to our tearms and condition
                    </CustomText>
                    <SafeAreaView />
                </View>

                <TouchableOpacity 
                style={styles.absulateSwitch}
                onPress={()=> resetAndNavigate('DeliveryLogin')}
                >
                    <Icon 
                    name='pedal-bike'
                    color='#000'
                    size={RFValue(14)} 
                    />

                </TouchableOpacity>

            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        borderTopWidth: 0.8,
        borderBlockColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'f9f8fc',
        width: '100%'
    },
    subContiner: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    gradient: {
        paddingTop: 60,
        width: '100%'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginBottom:20
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8
    },
    phoneText: {
        marginLeft: 10
    },
    absulateSwitch:{
        position:'absolute',
        width:55,
        height:55,
        justifyContent:'center',
        alignItems:'center',
        top:Platform.OS === 'ios' ? 50 : 20,
        backgroundColor:"#fff",
        shadowColor:'#000',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.5,
        shadowRadius:12,
        elevation:10,
        padding:10,
        borderRadius:50,
        right:10,
        zIndex:99

    }
})

export default CustomerLogin