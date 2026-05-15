import {
  Card,
  CardContent,
  Chip,
  Divider,
  Box,
  Stack,
  Typography
} from '@mui/material';

import PaymentInstallmentTable from './PaymentInstallmentTable';
import type { StudentEnrollment } from '../types/accounting.types';

interface Props {
  enrollment: StudentEnrollment;
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

export default function EnrollmentSummaryCard({ enrollment, studentId }: Props) {
  const paidAmount = enrollment.paymentInstallments
    .filter((x) => x.isPaid)
    .reduce((total, item) => total + item.amount, 0);

  const remainingAmount = enrollment.netAmount - paidAmount;

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {enrollment.course.name}
            </Typography>

            <Typography color="text.secondary">
              Kayıt Tarihi: {formatDate(enrollment.enrollmentDate)}
            </Typography>
          </Stack>

          <Chip
            label={enrollment.isActive ? 'Aktif Kayıt' : 'Pasif Kayıt'}
            color={enrollment.isActive ? 'success' : 'default'}
          />
        </Stack>

        <Divider sx={{ my: 2.5 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 2
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Kurs Ücreti
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>
              {formatCurrency(enrollment.coursePrice)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              İndirim
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>
              {formatCurrency(enrollment.discountAmount)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Net Tutar
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>
              {formatCurrency(enrollment.netAmount)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Taksit Sayısı
            </Typography>
            <Typography sx={{ fontWeight: 800 }}>
              {enrollment.installmentCount}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Ödenen
            </Typography>
            <Typography sx={{ fontWeight: 800, color: 'success.main' }}>
              {formatCurrency(paidAmount)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Kalan
            </Typography>
            <Typography sx={{ fontWeight: 800, color: 'warning.main' }}>
              {formatCurrency(remainingAmount)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <PaymentInstallmentTable
          installments={enrollment.paymentInstallments}
          studentId={studentId}
        />
      </CardContent>
    </Card>
  );
}