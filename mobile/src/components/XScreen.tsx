import { colors } from '@/utils/theme'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

type Props = SafeAreaViewProps & {
    paddingHorizontal?: number
}

const XScreen = ({ paddingHorizontal = 16, children, style, ...rest }: Props) => {
    return (

        <SafeAreaView {...rest} style={
            [
                {
                    paddingHorizontal
                },
                styles.container,
                style
            ]
        } >
            {children}
        </SafeAreaView>
    )
}

export default XScreen

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? 16 : 8
    }
})