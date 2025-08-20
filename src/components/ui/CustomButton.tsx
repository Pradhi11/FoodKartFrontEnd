import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';


interface CustomButtonProps {
  onPress:()=> void;
  title:string;
  disable:boolean;
  loading:boolean
}

const CustomButton:FC<CustomButtonProps> = ({onPress,title,disable,loading}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    disabled={disable}
    activeOpacity={0.8}
    style={[styles.btn,{backgroundColor: disable ? Colors.disabled : Colors.secondary}]}
    >{
      loading ? <ActivityIndicator color='#fff' size='small' /> :
      <CustomText
      style={styles.txt}
      fontFamily={Fonts.SemiBold}
      variants='h6'>
        {title}
      </CustomText>
    }
     
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

       btn:{
           justifyContent:'center',
           alignItems:'center',
           borderRadius:10,
           padding:15,
           marginVertical:15,
           width:'100%'
       },
       txt:{
        color:'#fff'

       }
})

export default CustomButton