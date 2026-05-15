import { Chip, Stack, Typography } from '@mui/material';

import GenericDetailModal from '../../../shared/components/modal/GenericDetailModal';

import type { Course } from '../types/course.types';

type Props = {
  course: Course | null;
  onClose: () => void;
};

function formatDate(value: string | null) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('tr-TR');
}

export default function CourseDetailDialog({ course, onClose }: Props) {
  return (
    <GenericDetailModal
      open={Boolean(course)}
      title={course?.name ?? 'Kurs Detayı'}
      subtitle="Kurs bilgileri, öğretmen ve kayıtlı öğrenciler"
      onClose={onClose}
      chips={[
        {
          label: course?.isActive ? 'Aktif' : 'Pasif',
          color: course?.isActive ? 'success' : 'default',
        },
        {
          label: `${course?.price ?? 0} ₺`,
          color: 'primary',
          variant: 'outlined',
        },
      ]}
      sections={[
        {
          title: 'Açıklama',
          content: (
            <Typography color="text.secondary">
              {course?.description ?? '-'}
            </Typography>
          ),
        },
        {
          title: 'Genel Bilgiler',
          fields: [
            {
              label: 'Öğretmen',
              value: course?.teacher
                ? `${course.teacher.name ?? ''} ${course.teacher.surname ?? ''}`.trim()
                : 'Öğretmen yok',
            },
            {
              label: 'Öğretmen Branşı',
              value: course?.teacher?.branch ?? '-',
            },
            {
              label: 'Oluşturulma Tarihi',
              value: formatDate(course?.createdDate ?? null),
            },
            {
              label: 'Güncellenme Tarihi',
              value: formatDate(course?.updatedDate ?? null),
            },
          ],
        },
        {
          title: 'Kayıtlı Öğrenciler',
          content: course?.students?.length ? (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {course.students.map((student) => (
                <Chip
                  key={student.id}
                  label={`${student.name ?? ''} ${student.surname ?? ''}`.trim()}
                  variant="outlined"
                />
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Bu kursa kayıtlı öğrenci yok.
            </Typography>
          ),
        },
      ]}
    />
  );
}