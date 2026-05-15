import { Chip } from '@mui/material';

import type { CrudColumn } from '../../../shared/components/crud/crud.types';
import type { Student } from '../types/student.types';

export const studentColumns: CrudColumn<Student>[] = [
  {
    key: 'id',
    header: 'ID',
    type: 'number',
    width: 60,
  },
  {
    key: 'name',
    header: 'Ad',
    minWidth: 150,
  },
  {
    key: 'surname',
    header: 'Soyad',
    minWidth: 150,
  },
  {
    key: 'email',
    header: 'E-posta',
    minWidth: 220,
    render: (student) => student.email ?? '-',
  },
  {
    key: 'phoneNumber',
    header: 'Telefon',
    width: 150,
    render: (student) => student.phoneNumber ?? '-',
  },
  {
    key: 'isActive',
    header: 'Durum',
    type: 'boolean',
    width: 110,
  },
  {
    key: 'enrollments',
    header: 'Kurs',
    width: 130,
    render: (student) =>
      student.enrollments?.length > 0 ? (
        <Chip
          size="small"
          label={`${student.enrollments.length} kurs`}
          sx={{
            height: 26,
            borderRadius: '0 !important',
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