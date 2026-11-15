import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import XText from './XText'

type Props = TextInputProps & {
  label: string
  rightIcon?: keyof typeof Ionicons.glyphMap
}

const XField = ({ label, rightIcon, style, ...rest }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <XText fontSize={12} color={colors.textGrey}>
          {label}
        </XText>
        <TextInput
          placeholderTextColor={colors.textGrey}
          {...rest}
          style={[styles.input, style]}
        />
      </View>
      {rightIcon && <Ionicons name={rightIcon} size={18} color={colors.textGrey} />}
    </View>
  )
}

export default XField

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  content: { flex: 1 },
  input: { padding: 0, marginTop: 2, fontSize: 15, fontWeight: '600' },
})