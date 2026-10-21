export const TIP_PRESET_VALUES = [10, 15, 18, 20] as const;

export type TipInput = {
  bill: number;
  tipPercent: number;
  split: number;
};

export type TipSummary = {
  amountPerPerson: number;
  tipAmount: number;
  totalAmount: number;
};

export function sanitizeBillInput(rawValue: string): string {
  const normalized = rawValue.replace(',', '.');
  const [integerPart, ...decimalParts] = normalized.split('.');
  const safeInteger = integerPart.replace(/[^\d]/g, '');
  const safeDecimal = decimalParts.join('').replace(/[^\d]/g, '').slice(0, 2);

  if (normalized.includes('.')) {
    return safeDecimal ? `${safeInteger}.${safeDecimal}` : `${safeInteger}.`;
  }

  return safeInteger;
}

export function calculateTipSummary(input: TipInput): TipSummary {
  const bill = Number.isFinite(input.bill) && input.bill > 0 ? input.bill : 0;
  const tipPercent = Number.isFinite(input.tipPercent) && input.tipPercent >= 0 ? input.tipPercent : 0;
  const split = Number.isInteger(input.split) && input.split > 0 ? input.split : 1;

  const tipAmount = (bill * tipPercent) / 100;
  const totalAmount = bill + tipAmount;
  const amountPerPerson = totalAmount / split;

  return {
    amountPerPerson,
    tipAmount,
    totalAmount,
  };
}
