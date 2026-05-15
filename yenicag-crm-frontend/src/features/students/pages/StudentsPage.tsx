import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import CrudPage from '../../../shared/components/crud/CrudPage';

import { studentColumns } from '../components/student-columns';
import StudentDetailDialog from '../components/StudentDetailDialog';
import CreateStudentDialog from '../components/CreateStudentDialog';
import { GET_ALL_STUDENTS } from '../graphql/queries';

import type {
  GetAllStudentsResponse,
  Student,
} from '../types/student.types';

import type { CrudAction } from '../../../shared/components/crud/crud.types';

export default function StudentsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);

  const navigate = useNavigate();

  const studentActions = useMemo<CrudAction<Student>[]>(
    () => [
      {
        label: 'Detay',
        variant: 'contained',
        color: 'primary',
        icon: <VisibilityRoundedIcon fontSize="small" />,
        onClick: (student) => setDetailStudent(student),
      },
      {
        label: 'Muhasebe',
        variant: 'outlined',
        color: 'info',
        icon: <AccountBalanceWalletRoundedIcon fontSize="small" />,
        onClick: (student) =>
          navigate(`/accounting/students/${student.id}`),
      },
    ],
    [navigate],
  );

  return (
    <>
      <CrudPage<Student, GetAllStudentsResponse>
        title="Öğrenciler"
        description="Sistemde kayıtlı öğrencileri görüntüleyin."
        actionText="Yeni Öğrenci"
        query={GET_ALL_STUDENTS}
        dataKey="allStudents"
        columns={studentColumns}
        actions={studentActions}
        onActionClick={() => setCreateOpen(true)}
      />

      <StudentDetailDialog
        student={detailStudent}
        onClose={() => setDetailStudent(null)}
      />

      <CreateStudentDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
}