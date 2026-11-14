import { colors } from '@/utils/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import XRow from './XRow';

type Props = TextInputProps & {
    icon?: keyof typeof Ionicons.glyphMap
    iconColor?: string
    iconSize?: number
}

const XInput = ({
    icon = 'mail-outline',
    iconColor = colors.textGrey,
    iconSize = 24,
    style,
    ...rest
}: Props) => {
    return (
        <XRow style={styles.container}>
            <Ionicons name={icon} size={iconSize} color={iconColor} />
            <TextInput
                placeholderTextColor={colors.textGrey}
                {...rest}
                style={[styles.input, style]}
            />
        </XRow>
    )
}

export default XInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.background,
        borderColor: colors.textGrey,
        borderWidth: 2,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        padding: 0,
    },
})