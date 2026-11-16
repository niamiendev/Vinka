import { StyleSheet, View, ViewProps } from 'react-native'


type Props = ViewProps & {
    width?: number,
    height?: number,
    backgroundColor?: string,
}

const XSpace = ({ width, height, backgroundColor, style, children, ...rest }: Props) => {
    return (
        <View
            {...rest}
            style={
                [
                    styles.container,
                    {
                        width, height, backgroundColor
                    },
                    style
                ]
            }
        >
            {children}
        </View>
    )
}

export default XSpace

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    }
})