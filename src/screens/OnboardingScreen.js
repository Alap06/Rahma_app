import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SPACING, RADIUS } from '../utils/constants';
import AnimatedButton from '../components/common/AnimatedButton';
import useStore from '../store/useStore';

const { width, height } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: '1',
    title: 'Bienvenue chez FitPulse',
    description: 'Découvrez une collection premium de produits fitness et sportifs',
    icon: '🏋️',
    gradient: ['#0066FF', '#00D4AA'],
  },
  {
    id: '2',
    title: 'Shopping Ultra Rapide',
    description: 'Naviguez facilement et trouvez vos produits préférés en quelques clics',
    icon: '🛍️',
    gradient: ['#00D4AA', '#FF6B35'],
  },
  {
    id: '3',
    title: 'Livraison Express',
    description: 'Commandes livrées rapidement avec un suivi en temps réel',
    icon: '📦',
    gradient: ['#FF6B35', '#0066FF'],
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const { setOnboardingComplete } = useStore();

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSkip();
    }
  };

  const handleSkip = () => {
    setOnboardingComplete();
    navigation.replace('Main');
  };

  const renderSlide = ({ item }) => (
    <View
      style={[
        styles.slide,
        {
          width,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDot = (index) => {
    const opacity = scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    const scale = scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0.8, 1.3, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <RNAnimated.View
        key={index}
        style={[
          styles.dot,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        scrollEventThrottle={16}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {onboardingSlides.map((_, index) => renderDot(index))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
        <AnimatedButton
          label={currentIndex === onboardingSlides.length - 1 ? 'Commencer' : 'Suivant'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  description: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: SPACING.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  buttonsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  skipText: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

export default OnboardingScreen;
