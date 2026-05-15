import type { ReactNode } from 'react';

export type CrudColumnType =
  | 'text'
  | 'number'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'status';

export type CrudColumn<T> = {
  key: keyof T | string;
  header: string;
  type?: CrudColumnType;
  width?: number;
  minWidth?: number;
  render?: (row: T) => ReactNode;
};

export type CrudAction<T> = {
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  variant?: 'text' | 'outlined' | 'contained';
  icon?: ReactNode;
  onClick: (row: T) => void;
};