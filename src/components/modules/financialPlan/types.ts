
import { DataSourceType } from '@/types/raioXTypes';
import { DetailItem, ActionItem } from '@/types/moduleTypes';
import React from 'react';

export interface PlanSectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
  details: DetailItem[];
  actions: ActionItem[];
}

export interface FinancialPlanData {
  lastUpdated: string;
  sections: PlanSectionData[];
}

export interface InvestmentData {
  totalValue: number;
  fixedIncomeValue: number;
  fixedIncomePercentage: number;
  stocksValue: number;
  stocksPercentage: number;
  fundsValue: number;
  fundsPercentage: number;
  fiisValue: number;
  fiisPercentage: number;
  internationalValue: number;
  internationalPercentage: number;
  alternativesValue: number;
  alternativesPercentage: number;
  ytdReturn: number;
  benchmarkReturn: number;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
}
