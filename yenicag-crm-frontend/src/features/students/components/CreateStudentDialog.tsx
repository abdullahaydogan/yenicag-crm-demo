import { useState } from 'react';

import {
  Alert,
  Autocomplete,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import {
  BadgeRounded,
  CakeRounded,
  EmailRounded,
  PersonRounded,
  PhoneRounded,
} from '@mui/icons-material';

import { useMutation, useQuery } from '@apollo/client/react';

import GenericModal from '../../../shared/components/modal/GenericModal';

import { GET_ALL_COURSES } from '../../courses/graphql/queries';
import { CREATE_STUDENT } from '../graphql/mutations';
import { GET_ALL_STUDENTS } from '../graphql/queries';

import type {
  Course,
  GetAllCoursesResponse,
} from '../../courses/types/course.types';

import type {
  CreateStudentRequest,
  CreateStudentResponse,
} from '../types/student.types';

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialForm: CreateStudentRequest = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  courseIds: [],
};

function validateStudentForm(form: CreateStudentRequest) {
  if (!form.name.trim()) {
    return 'Öğrenci adı zorunludur.';
  }

  if (!form.email.trim()) {
    return 'Öğrenci e-posta adresi zorunludur.';
  }

  if (form.name.trim().length < 2) {
    return 'Öğrenci adı en az 2 karakter olmalıdır.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return 'Geçerli bir e-posta adresi giriniz.';
  }

  return null;
}

export default function CreateStudentDialog({ open, onClose }: Props) {
  const [form, setForm] = useState<CreateStudentRequest>(initialForm);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    data: courseData,
    loading: coursesLoading,
  } = useQuery<GetAllCoursesResponse>(GET_ALL_COURSES, {
    skip: !open,
  });

  const courses = courseData?.allCourses ?? [];

  const [createStudent, { loading, error }] = useMutation<
    CreateStudentResponse,
    { request: CreateStudentRequest }
  >(CREATE_STUDENT, {
    refetchQueries: [
      { query: GET_ALL_STUDENTS },
      { query: GET_ALL_COURSES },
    ],
    awaitRefetchQueries: true,
  });

  const updateField = <TKey extends keyof CreateStudentRequest>(
    key: TKey,
    value: CreateStudentRequest[TKey],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setValidationError(null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedCourses([]);
    setValidationError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const validationMessage = validateStudentForm(form);

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    await createStudent({
      variables: {
        request: {
          name: form.name.trim(),
          surname: form.surname?.trim() || null,
          email: form.email.trim(),
          phoneNumber: form.phoneNumber?.trim() || null,
          dateOfBirth: form.dateOfBirth || null,
          courseIds: selectedCourses.map((course) => course.id),
        },
      },
    });

    handleClose();
  };

  return (
    <GenericModal
      open={open}
      title="Yeni Öğrenci Oluştur"
      subtitle="Öğrenci bilgilerini girerek yeni kayıt oluşturun."
      onClose={handleClose}
      maxWidth="sm"
      actions={
        <>
          <Button onClick={handleClose} disabled={loading}>
            Vazgeç
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Kaydediliyor...' : 'Öğrenciyi Kaydet'}
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        {(validationError || error) && (
          <Alert severity="error">
            {validationError ?? error?.message}
          </Alert>
        )}

        <TextField
          label="Ad"
          placeholder="Örn: Ahmet"
          value={form.name}
          fullWidth
          required
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRounded fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => updateField('name', event.target.value)}
        />

        <TextField
          label="Soyad"
          placeholder="Örn: Yılmaz"
          value={form.surname ?? ''}
          fullWidth
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeRounded fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => updateField('surname', event.target.value)}
        />

        <TextField
          label="E-posta"
          placeholder="ornek@mail.com"
          value={form.email}
          fullWidth
          required
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => updateField('email', event.target.value)}
        />

        <TextField
          label="Telefon"
          placeholder="05551234567"
          value={form.phoneNumber ?? ''}
          fullWidth
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneRounded fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: {
              maxLength: 20,
            },
          }}
          onChange={(event) => updateField('phoneNumber', event.target.value)}
        />

        <TextField
          label="Doğum Tarihi"
          type="date"
          value={form.dateOfBirth ?? ''}
          fullWidth
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CakeRounded fontSize="small" />
                </InputAdornment>
              ),
            },
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(event) => updateField('dateOfBirth', event.target.value)}
        />

        <Autocomplete
          multiple
          options={courses}
          value={selectedCourses}
          loading={coursesLoading}
          disabled={loading}
          getOptionLabel={(option) => option.name ?? 'İsimsiz kurs'}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => {
            setSelectedCourses(value);
            updateField(
              'courseIds',
              value.map((course) => course.id),
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kurslar"
              placeholder="Kurs seçin"

            />
          )}
        />
      </Stack>
    </GenericModal>
  );
}