export type PaymentMethod =
  | 'GCASH'
  | 'MAYA'
  | 'QRPH'
  | 'CARD'
  | 'BANK_TRANSFER';

export interface PaymentState {
  method: PaymentMethod | null;
}
