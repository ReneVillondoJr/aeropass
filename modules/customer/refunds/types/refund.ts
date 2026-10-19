import type {
  CustomerRefundDetailRecord,
  CustomerRefundListRecord,
  RefundStatus,
} from '@/data/aeropass';

export type CustomerRefundRecord = CustomerRefundListRecord;

export type CustomerRefundDetail = CustomerRefundDetailRecord;

export type CustomerRefundStatusFilter = 'ALL' | RefundStatus;

export type CustomerRefundCounts = Record<CustomerRefundStatusFilter, number>;

export interface CustomerRefundStats {
  total: number;
  requested: number;
  processing: number;
  completed: number;
  rejected: number;
  completedAmount: number;
}
