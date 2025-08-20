import { View, Text, TextStyle, StyleSheet, TextProps } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'body';

interface Props extends TextProps {
    variants?: Variant;
    fontFamily?: string;
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children: React.ReactNode;
    numberOfLines?: number;
}

const variantFontSizes: Record<Variant, number> = {
    h1: 22,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
    h7: 10,
    h8: 8,
    h9: 9,
    body: 12,
};

const CustomText: FC<Props> = ({
    variants = 'body',
    fontFamily = Fonts.Regular,
    fontSize,
    style,
    children,
    numberOfLines,
    onLayout,
    ...props
}) => {
    const computedSize = RFValue(fontSize ?? variantFontSizes[variants]);
    return (
        <Text
            style={[
                styles.text,
                { color: Colors.text, fontSize: computedSize, fontFamily },
                style,
            ]}
            onLayout={onLayout}
            numberOfLines={numberOfLines}
            {...props}
        >
            {children}
        </Text>
    );
};


const styles = StyleSheet.create({
    text: {
        textAlign: 'left'
    }
})

export default CustomText