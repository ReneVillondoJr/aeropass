export interface CheckoutSummary {
  baseFare: number;
  taxes: number;
  fees: number;
  baggage: number;
  addons: number;
  total: number;
}
