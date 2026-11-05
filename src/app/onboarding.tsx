import XColumn from '@/components/XColumn'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import { onboardings } from '@/utils/store'
import { colors } from '@/utils/theme'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'

const OnboardingScreen = () => {
  const { width } = useWindowDimensions()
  const listRef = useRef<FlatList>(null)
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const isLast = index === onboardings.length - 1

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width)
    setIndex(newIndex)
  }

  const handleNext = () => {
    if (isLast) {
      router.replace('/(auth)/login')
      return
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true })
  }

  const handleSkip = () => {
    router.replace("/(auth)/login")
  }

  return (
    <XScreen paddingHorizontal={0} style={styles.container}>
      {/* Bouton Passer */}
      <View style={styles.header}>
        {!isLast && (
          <Pressable onPress={handleSkip} hitSlop={10}>
            <XText fontSize={14}>Passer</XText>
          </Pressable>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={onboardings}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item }) => (
          <XColumn style={[styles.page, { width }]}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={require('@/assets/images/background.png')}
                style={styles.backgroundImage}
              />
              <Image resizeMode="contain" source={item.image} style={styles.upImage} />
            </View>
            <XColumn gap={16}>
              <XText fontSize={32} textAlign="center" fontWeight={900}>
                {item.title}
              </XText>
              <XText fontSize={14} textAlign="center">
                {item.description}
              </XText>
            </XColumn>
          </XColumn>
        )}
      />

      {/* Points de pagination */}
      <View style={styles.dots}>
        {onboardings.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>

      {/* Bouton principal */}
      <Pressable style={styles.button} onPress={handleNext}>
        <XText fontSize={16} fontWeight={700} color="white">
          {isLast ? 'Commencer' : 'Suivant'}
        </XText>
      </Pressable>
    </XScreen>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  page: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
  },
  backgroundImage: {
    width: 350,
    height: 300,
  },
  upImage: {
    width: 180,
    height: 180,
    position: 'absolute',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 32,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})