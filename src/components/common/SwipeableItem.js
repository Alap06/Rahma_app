import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { COLORS, SPACING } from '../utils/constants';

const SwipeableItem = ({
  item,
  onDelete,
  onEdit,
  backgroundColor = COLORS.dark,
  children,
}) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < -100) {
      translateX.value = withSpring(-100, { damping: 15 });
    } else {
      translateX.value = withSpring(0, { damping: 15 });
    }
  };

  const handleDelete = () => {
    translateX.value = withSpring(0);
    onDelete();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.actions, { backgroundColor }]}>
        {onEdit && (
          <TouchableOpacity
            style={[styles.action, styles.editAction]}
            onPress={onEdit}
          >
            <Text style={styles.actionText}>Modifier</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.action, styles.deleteAction]}
          onPress={handleDelete}
        >
          <Text style={styles.actionText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <Animated.View
          style={[
            styles.content,
            animatedStyle,
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  action: {
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAction: {
    backgroundColor: COLORS.primary,
    minWidth: 80,
  },
  deleteAction: {
    backgroundColor: '#FF4444',
    minWidth: 100,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});

export default SwipeableItem;
