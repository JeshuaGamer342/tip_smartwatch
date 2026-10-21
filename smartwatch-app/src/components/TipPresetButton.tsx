import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

type TipPresetButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  percentage: number;
  selected?: boolean;
  textOverride?: string;
};

export function TipPresetButton({
  disabled = false,
  onPress,
  percentage,
  selected = false,
  textOverride,
}: TipPresetButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.buttonSelected,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {textOverride ?? `${percentage}%`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#101010',
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 50,
    minWidth: 74,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  textSelected: {
    color: '#001537',
  },
});
