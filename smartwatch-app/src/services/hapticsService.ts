import * as Haptics from 'expo-haptics';

export async function triggerTipSelectionHaptic(): Promise<void> {
  await Haptics.selectionAsync();
}

export async function triggerInputAdjustmentHaptic(): Promise<void> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}
