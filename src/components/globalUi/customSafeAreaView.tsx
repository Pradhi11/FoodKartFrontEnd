import { View, Text, ViewStyle, StyleSheet, SafeAreaView } from 'react-native'
import React,{FC,ReactNode} from 'react'

interface customSafeAreaViewProps {
    children:ReactNode,
    style?: ViewStyle
}

const CustomSafeAreaView:FC<customSafeAreaViewProps> = ({children,style}) => {
  return (
    <View style={styles.container}>
     <SafeAreaView />
     {children}
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})

export default CustomSafeAreaView