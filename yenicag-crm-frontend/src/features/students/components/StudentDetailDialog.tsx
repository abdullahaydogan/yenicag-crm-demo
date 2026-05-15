import { Chip, Stack, Typography } from '@mui/material';

import GenericDetailModal from '../../../shared/components/modal/GenericDetailModal';

import type { Student } from '../types/student.types';

type Props = {
  student: Student | null;
  onClose: () => void;
};

function formatDate(value: string | null) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('tr-TR');
}

function getFullName(student: Student | null) {
  if (!student) {
    return 'Öğrenci Detayı';
  }

  return `${student.name ?? ''} ${student.surname ?? ''}`.trim() || 'İsimsiz öğrenci';
}

export default function StudentDetailDialog({ student, onClose }: Props) {
  return (
    <GenericDetailModal
      open={Boolean(student)}
      title={getFullName(student)}
      subtitle="Öğrenci bilgileri ve kayıtlı olduğu kurslar"
      onClose={onClose}
      chips={[
        {
          label: student?.isActive ? 'Aktif' : 'Pasif',
          color: student?.isActive ? 'success' : 'default',
        },
        {
          label: `${student?.enrollments?.length ?? 0} kurs`,
          color: 'primary',
          variant: 'outlined',
        },
      ]}
      sections={[
        {
          title: 'İletişim Bilgileri',
          fields: [
            {
              label: 'E-posta',
              value: student?.email ?? '-',
            },
            {
              label: 'Telefon',
              value: student?.phoneNumber ?? '-',
            },
            {
              label: 'Doğum Tarihi',
              value: student?.dateOfBirth
                ? new Date(student.dateOfBirth).toLocaleDateString('tr-TR')
                : '-',
            },
          ],
        },
        {
          title: 'Sistem Bilgileri',
          fields: [
            {
              label: 'Oluşturulma Tarihi',
              value: formatDate(student?.createdDate ?? null),
            },
            {
              label: 'Güncellenme Tarihi',
              value: formatDate(student?.updatedDate ?? null),
            },
          ],
        },
        {
          title: 'Kayıtlı Olduğu Kurslar',
          content: student?.enrollments?.length ? (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {student.enrollments.map((enrollment) => (
                <Chip
                  key={enrollment.id}
                  label={enrollment.course?.name ?? 'İsimsiz kurs'}
                  variant="outlined"
                  sx={{
                    borderRadius: '0 !important',
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Bu öğrenci herhangi bir kursa kayıtlı değil.
            </Typography>
          ),
        },
      ]}
    />
  );
}