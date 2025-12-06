import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../utils/constants';

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  icon = null,
  disabled = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          error && styles.errorBorder,
          disabled && styles.disabled,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithIcon,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: RADIUS.md,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.dark,
    fontFamily: 'Poppins',
  },
  inputWithIcon: {
    marginLeft: SPACING.sm,
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  errorBorder: {
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: SPACING.xs,
    fontFamily: 'Poppins',
  },
  disabled: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.6,
  },
});

export default TextInputField;
