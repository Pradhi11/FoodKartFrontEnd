import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  CollapsibleHeaderContainer,
  withCollapsibleContext
} from '@r0b0t3d/react-native-collapsible'
import { NoticeHeight,screenHeight } from '@utils/Scaling'

const NOTICE_HEIGHT = -(NoticeHeight + 12)

const ProductDashboard = () => {
  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default withCollapsibleContext(ProductDashboard)