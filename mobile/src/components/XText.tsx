import { colors } from '@/utils/theme';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';


type Props = TextProps & {
    fontWeight?: TextStyle["fontWeight"],
    textAlign?: TextStyle["textAlign"],
    backgroundColor?: string,
    fontSize?: number,
    color?: string
}

const XText = ({ color = colors.text, textAlign, fontSize, fontWeight, backgroundColor, style, children, ...rest }: Props) => {
    return (
        <Text
            {...rest}
            style={
                [
                    styles.component,
                    {
                        fontSize, fontWeight, color, textAlign, backgroundColor
                    },
                    style
                ]
            }
        >
            {children}
        </Text>
    )
}

export default XText

const styles = StyleSheet.create({
    component: {

    }
})