import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import type { StudentAccountingDetail } from '../types/accounting.types';

interface StudentInfoCardProps {
  student: StudentAccountingDetail;
}

function formatDate(value?: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('tr-TR');
}

export default function StudentInfoCard({ student }: StudentInfoCardProps) {
  const fullName = `${student.name} ${student.surname}`;

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              sm: 'center'
            }
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="overline" color="text.secondary">
              Öğrenci Bilgileri
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {fullName}
            </Typography>

            <Typography color="text.secondary">
              {student.email || 'Email yok'} ·{' '}
              {student.phoneNumber || 'Telefon yok'}
            </Typography>
          </Stack>

          <Chip
            label={student.isActive ? 'Aktif Öğrenci' : 'Pasif Öğrenci'}
            color={student.isActive ? 'success' : 'default'}
            variant="filled"
          />
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
          <Stack>
            <Typography variant="caption" color="text.secondary">
              Doğum Tarihi
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {formatDate(student.dateOfBirth)}
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="caption" color="text.secondary">
              Kayıt Tarihi
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {formatDate(student.createdDate)}
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="caption" color="text.secondary">
              Toplam Kurs Kaydı
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {student.enrollments.length}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}