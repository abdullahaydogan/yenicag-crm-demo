import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import {
  GET_ALL_COURSES_FOR_ACCOUNTING,
  GET_STUDENT_ACCOUNTING_DETAIL
} from '../graphql/accountingQueries';
import { CREATE_STUDENT_ENROLLMENT_ACCOUNTING } from '../graphql/accountingMutations';

import type {
  Course,
  GetAllCoursesForAccountingResponse
} from '../types/accounting.types';

interface Props {
  open: boolean;
  studentId: number;
  onClose: () => void;
}

export default function CreateEnrollmentAccountingDialog({
  open,
  studentId,
  onClose
}: Props) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [coursePrice, setCoursePrice] = useState('');
  const [discountAmount, setDiscountAmount] = useState('0');
  const [installmentCount, setInstallmentCount] = useState('1');
  const [firstDueDate, setFirstDueDate] = useState('');

  const { data: courseData } = useQuery<GetAllCoursesForAccountingResponse>(
    GET_ALL_COURSES_FOR_ACCOUNTING
  );

  const [createEnrollment, { loading, error }] = useMutation(
    CREATE_STUDENT_ENROLLMENT_ACCOUNTING,
    {
      refetchQueries: [
        {
          query: GET_STUDENT_ACCOUNTING_DETAIL,
          variables: { studentId }
        }
      ],
      awaitRefetchQueries: true
    }
  );

  const courses = courseData?.allCourses ?? [];

  const netAmount = useMemo(() => {
    const price = Number(coursePrice || 0);
    const discount = Number(discountAmount || 0);

    return Math.max(price - discount, 0);
  }, [coursePrice, discountAmount]);

  const handleCourseChange = (_: unknown, course: Course | null) => {
    setSelectedCourse(course);
    setCoursePrice(course ? String(course.price) : '');
  };

  const resetForm = () => {
    setSelectedCourse(null);
    setCoursePrice('');
    setDiscountAmount('0');
    setInstallmentCount('1');
    setFirstDueDate('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedCourse) return;

    await createEnrollment({
      variables: {
        studentId,
        courseId: selectedCourse.id,
        coursePrice: Number(coursePrice),
        discountAmount: Number(discountAmount),
        installmentCount: Number(installmentCount),
        firstDueDate
      }
    });

    resetForm();
    onClose();
  };

  const isDisabled =
    !selectedCourse ||
    !coursePrice ||
    !installmentCount ||
    !firstDueDate ||
    Number(coursePrice) <= 0 ||
    Number(installmentCount) <= 0 ||
    Number(discountAmount) < 0 ||
    Number(discountAmount) > Number(coursePrice);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Yeni Kurs / Muhasebe Kaydı</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error.message}</Alert>}

          <Autocomplete
            options={courses}
            value={selectedCourse}
            onChange={handleCourseChange}
            getOptionLabel={(option) => `${option.name} - ${option.price}₺`}
            renderInput={(params) => (
              <TextField {...params} label="Kurs Seçiniz" />
            )}
          />

          <TextField
            label="Kurs Ücreti"
            type="number"
            value={coursePrice}
            onChange={(event) => setCoursePrice(event.target.value)}
            fullWidth
          />

          <TextField
            label="İndirim Tutarı"
            type="number"
            value={discountAmount}
            onChange={(event) => setDiscountAmount(event.target.value)}
            fullWidth
          />

          <TextField
            label="Net Tutar"
            value={`${netAmount.toLocaleString('tr-TR')} ₺`}
            fullWidth
            disabled
          />

          <TextField
            label="Taksit Sayısı"
            type="number"
            value={installmentCount}
            onChange={(event) => setInstallmentCount(event.target.value)}
            fullWidth
          />

          <TextField
            label="İlk Vade Tarihi"
            type="date"
            value={firstDueDate}
            onChange={(event) => setFirstDueDate(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Vazgeç</Button>

        <Button
          variant="contained"
          disabled={isDisabled || loading}
          onClick={handleSubmit}
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}