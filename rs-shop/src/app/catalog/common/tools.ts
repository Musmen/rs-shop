import {
  Colors, Titles, AmountStatus, DEFAULT_AMOUNT_VISUALIZATION,
} from './constants';
import { IAmountVisualization } from '../models/amaunt-visualization.model';

type GetToolFunctionType = (amount: number) => IAmountVisualization;

export const getAmountVisualization: GetToolFunctionType = (
  amount: number,
) => {
  if (amount > AmountStatus.high) return { color: Colors.green, title: Titles.high };
  if (amount < AmountStatus.low) return { color: Colors.red, title: Titles.low };
  return DEFAULT_AMOUNT_VISUALIZATION;
};
