import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'


type Props = ViewProps & {
    width?: number | string,
    backgroundColor?: string,
    padding?: number,
    alignItems?: ViewStyle["alignItems"],
    gap?: number
}

const XColumn = ({ gap, alignItems = "center", width, padding, backgroundColor, style, children, ...rest }: Props) => {
    return (
        <View
            {...rest}
            style={
                [
                    styles.container,
                    {
                        width, padding, alignItems, gap, backgroundColor
                    },
                    style
                ]
            }
        >
            {children}
        </View>
    )
}

export default XColumn

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    }
})