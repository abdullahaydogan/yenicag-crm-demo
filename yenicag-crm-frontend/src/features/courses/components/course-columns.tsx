import { Chip } from '@mui/material';

import type { CrudColumn } from '../../../shared/components/crud/crud.types';

import type { Course } from '../types/course.types';

export const courseColumns: CrudColumn<Course>[] = [
  {
    key: 'id',
    header: 'ID',
    type: 'number',
    width: 60,
  },
  {
    key: 'name',
    header: 'Kurs Adı',
    minWidth: 260,
  },
  {
    key: 'price',
    header: 'Fiyat',
    type: 'currency',
    width: 130,
  },
  {
    key: 'isActive',
    header: 'Durum',
    type: 'boolean',
    width: 110,
  },
  {
    key: 'teacher',
    header: 'Öğretmen',
    minWidth: 180,
    render: (course) =>
      course.teacher
        ? `${course.teacher.name ?? ''} ${course.teacher.surname ?? ''}`.trim()
        : 'Öğretmen yok',
  },
  {
    key: 'students',
    header: 'Öğrenci',
    width: 120,
    render: (course) =>
      course.students?.length > 0 ? (
        <Chip
          size="small"
          label={`${course.students.length} öğrenci`}
          sx={{
            height: 26,
            borderRadius: 999,
            fontWeight: 700,
            background: '#eef2ff',
            color: '#3730a3',
          }}
        />
      ) : (
        '-'
      ),
  },
];