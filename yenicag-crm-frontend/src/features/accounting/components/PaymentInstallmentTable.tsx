import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useMutation } from '@apollo/client/react';

import type { PaymentInstallment } from '../types/accounting.types';
import { PAY_INSTALLMENT } from '../graphql/accountingMutations';
import { GET_STUDENT_ACCOUNTING_DETAIL } from '../graphql/accountingQueries';

interface PaymentInstallmentTableProps {
  installments: PaymentInstallment[];
  studentId: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('tr-TR');
}

export default function PaymentInstallmentTable({
  installments,
  studentId
}: PaymentInstallmentTableProps) {
  const [payInstallment, { loading }] = useMutation(PAY_INSTALLMENT, {
    refetchQueries: [
      {
        query: GET_STUDENT_ACCOUNTING_DETAIL,
        variables: { studentId }
      }
    ],
    awaitRefetchQueries: true
  });

  const handlePay = async (installmentId: number) => {
    await payInstallment({
      variables: {
        installmentId
      }
    });
  };

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 3, overflow: 'hidden' }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell>Taksit No</TableCell>
            <TableCell>Tutar</TableCell>
            <TableCell>Vade Tarihi</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>Ödeme Tarihi</TableCell>
            <TableCell align="right">İşlem</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {installments.map((installment) => (
            <TableRow key={installment.id} hover>
              <TableCell>{installment.installmentNumber}</TableCell>
              <TableCell>{formatCurrency(installment.amount)}</TableCell>
              <TableCell>{formatDate(installment.dueDate)}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={installment.isPaid ? 'Ödendi' : 'Bekliyor'}
                  color={installment.isPaid ? 'success' : 'warning'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{formatDate(installment.paidDate)}</TableCell>
              <TableCell align="right">
<Stack
  direction={{ xs: 'column', md: 'row' }}
  spacing={2}
  sx={{ justifyContent: 'space-between' }}
>                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={installment.isPaid || loading}
                    onClick={() => handlePay(installment.id)}
                  >
                    Öde
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}