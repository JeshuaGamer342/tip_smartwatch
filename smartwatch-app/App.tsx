import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { TipPresetButton } from './src/components/TipPresetButton';
import {
  calculateTipSummary,
  sanitizeBillInput,
  TIP_PRESET_VALUES,
} from './src/services/tipCalculatorEngine';
import {
  triggerInputAdjustmentHaptic,
  triggerTipSelectionHaptic,
} from './src/services/hapticsService';
import { colors } from './src/theme/colors';

const MIN_SPLIT = 1;
const MAX_SPLIT = 20;

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

export default function App() {
  const [billInput, setBillInput] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [split, setSplit] = useState(1);

  const billAmount = useMemo(() => {
    if (!billInput.trim()) {
      return 0;
    }
    return Number.parseFloat(billInput);
  }, [billInput]);

  const tipSummary = useMemo(
    () =>
      calculateTipSummary({
        bill: billAmount,
        tipPercent,
        split,
      }),
    [billAmount, split, tipPercent]
  );

  const onBillChange = (value: string) => {
    setBillInput(sanitizeBillInput(value));
    void triggerInputAdjustmentHaptic();
  };

  const onSelectTipPercent = (value: number) => {
    setTipPercent(value);
    void triggerTipSelectionHaptic();
  };

  const updateSplit = (direction: -1 | 1) => {
    setSplit((current) => {
      const next = current + direction;
      if (next < MIN_SPLIT || next > MAX_SPLIT) {
        return current;
      }
      return next;
    });
    void triggerInputAdjustmentHaptic();
  };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Calculadora de Propinas</Text>
        <Text style={styles.subtitle}>Optimizada para reloj y pantallas compactas</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Monto de la cuenta</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
            value={billInput}
            onChangeText={onBillChange}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Porcentaje de propina</Text>
          <View style={styles.tipButtonsContainer}>
            {TIP_PRESET_VALUES.map((value) => (
              <TipPresetButton
                key={value}
                percentage={value}
                selected={value === tipPercent}
                onPress={() => onSelectTipPercent(value)}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Dividir entre</Text>
          <View style={styles.splitControls}>
            <TipPresetButton
              percentage={-1}
              textOverride="-"
              onPress={() => updateSplit(-1)}
              disabled={split <= MIN_SPLIT}
            />
            <Text style={styles.splitValue}>{split}</Text>
            <TipPresetButton
              percentage={1}
              textOverride="+"
              onPress={() => updateSplit(1)}
              disabled={split >= MAX_SPLIT}
            />
          </View>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Propina</Text>
            <Text style={styles.resultValue}>{currencyFormatter.format(tipSummary.tipAmount)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total</Text>
            <Text style={styles.resultValue}>{currencyFormatter.format(tipSummary.totalAmount)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Por persona</Text>
            <Text style={styles.resultValue}>
              {currencyFormatter.format(tipSummary.amountPerPerson)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 14,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  splitControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitValue: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    minWidth: 80,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.resultBackground,
    borderColor: colors.accent,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    marginTop: 4,
    padding: 14,
  },
  resultRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  resultValue: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '800',
  },
});
