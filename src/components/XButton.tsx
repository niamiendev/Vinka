
import { colors } from '@/utils/theme';
import * as Haptics from 'expo-haptics';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    type TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps & {
    backgroundColor?: string;
    width?: string | number;
    loading?: boolean;
    bordered?: boolean;
};

const XButton = ({
    backgroundColor = colors.primary,
    bordered = false,
    width,
    children,
    loading = false,
    style,
    onPress,
    disabled,
    ...rest
}: Props) => {

    const handlePress: TouchableOpacityProps['onPress'] = async (event) => {
        if (loading || disabled) return;

        await Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Light
        );

        onPress?.(event);
    };

    return (
        <TouchableOpacity
            {...rest}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.container,
                bordered && styles.border,
                { backgroundColor, width },
                style,
            ]}
            onPress={handlePress}
        >
            {loading ? (
                <ActivityIndicator color={colors.background} />
            ) : (
                children
            )}
        </TouchableOpacity>
    );
};

export default XButton;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        borderWidth: 1,
        borderColor: colors.purple,
    },
});
