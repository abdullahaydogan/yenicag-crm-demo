import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useQuery } from '@apollo/client/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import StudentInfoCard from '../components/StudentInfoCard';
import EnrollmentSummaryCard from '../components/EnrollmentSummaryCard';
import CreateEnrollmentAccountingDialog from '../components/CreateEnrollmentAccountingDialog';

import { GET_STUDENT_ACCOUNTING_DETAIL } from '../graphql/accountingQueries';

import type {
  GetStudentAccountingDetailResponse,
  GetStudentAccountingDetailVariables,
  StudentEnrollment
} from '../types/accounting.types';

export default function StudentAccountingDetailPage() {
  const { id } = useParams();
  const [createOpen, setCreateOpen] = useState(false);

  const studentId = useMemo(() => Number(id), [id]);
  const isInvalidStudentId = !studentId || Number.isNaN(studentId);

  const { data, loading, error } = useQuery<
    GetStudentAccountingDetailResponse,
    GetStudentAccountingDetailVariables
  >(GET_STUDENT_ACCOUNTING_DETAIL, {
    variables: {
      studentId
    },
    skip: isInvalidStudentId,
    fetchPolicy: 'cache-and-network'
  });

  const student = data?.studentAccountingDetail ?? null;

  if (isInvalidStudentId) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Geçersiz öğrenci id değeri.</Alert>
      </Container>
    );
  }

  if (loading && !student) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Öğrenci bulunamadı.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
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
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                Öğrenci Muhasebe Detayı
              </Typography>

              <Typography color="text.secondary">
                Öğrencinin kurs kayıtları, indirimleri ve taksit planı.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setCreateOpen(true)}
              sx={{ borderRadius: 2, fontWeight: 800 }}
            >
              Kurs / Taksit Planı Ekle
            </Button>
          </Stack>

          <StudentInfoCard student={student} />

          {student.enrollments.length === 0 ? (
            <Alert severity="info">
              Bu öğrenciye ait kurs kaydı bulunmuyor. Yeni kurs/taksit planı
              ekleyebilirsiniz.
            </Alert>
          ) : (
            student.enrollments.map((enrollment: StudentEnrollment) => (
              <EnrollmentSummaryCard
                key={enrollment.id}
                enrollment={enrollment}
                studentId={student.id}
              />
            ))
          )}
        </Stack>
      </Container>

      <CreateEnrollmentAccountingDialog
        open={createOpen}
        studentId={student.id}
        onClose={() => setCreateOpen(false)}
      />
    </Box>
  );
}