import { useState } from 'react';

import {
  Alert,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import {
  AutoStoriesRounded,
  DescriptionRounded,
  PaymentsRounded,
} from '@mui/icons-material';

import { useMutation } from '@apollo/client/react';

import GenericModal from '../../../shared/components/modal/GenericModal';

import { CREATE_COURSE } from '../graphql/mutations';
import { GET_ALL_COURSES } from '../graphql/queries';

import type {
  CreateCourseRequest,
  CreateCourseResponse,
} from '../types/course.types';

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialForm: CreateCourseRequest = {
  name: '',
  description: '',
  price: 0,
};

function validateCourseForm(form: CreateCourseRequest) {
  if (!form.name.trim()) {
    return 'Kurs adı zorunludur.';
  }

  if (form.name.trim().length < 3) {
    return 'Kurs adı en az 3 karakter olmalıdır.';
  }

  if (form.price <= 0) {
    return 'Kurs fiyatı 0’dan büyük olmalıdır.';
  }

  if ((form.description?.length ?? 0) > 500) {
    return 'Açıklama en fazla 500 karakter olabilir.';
  }

  return null;
}

export default function CreateCourseDialog({ open, onClose }: Props) {
  const [form, setForm] = useState<CreateCourseRequest>(initialForm);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [createCourse, { loading, error }] = useMutation<
    CreateCourseResponse,
    { request: CreateCourseRequest }
  >(CREATE_COURSE, {
    refetchQueries: [{ query: GET_ALL_COURSES }],
    awaitRefetchQueries: true,
  });

  const updateField = <TKey extends keyof CreateCourseRequest>(
    key: TKey,
    value: CreateCourseRequest[TKey],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setValidationError(null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setValidationError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const validationMessage = validateCourseForm(form);

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    await createCourse({
      variables: {
        request: {
          name: form.name.trim(),
          description: form.description?.trim() || null,
          price: Number(form.price),
        },
      },
    });

    handleClose();
  };

  return (
    <GenericModal
      open={open}
      title="Yeni Kurs Oluştur"
      subtitle="Kurs bilgilerini girerek yeni bir eğitim programı oluşturun."
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
            {loading ? 'Kaydediliyor...' : 'Kursu Kaydet'}
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
          label="Kurs Adı"
          placeholder="Örn: LGS Hazırlık Programı"
          value={form.name}
          fullWidth
          required
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AutoStoriesRounded fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => updateField('name', event.target.value)}
        />

        <TextField
          label="Açıklama"
          placeholder="Kursun kapsamını, hedef kitlesini ve içeriğini yazın."
          value={form.description ?? ''}
          fullWidth
          multiline
          minRows={4}
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    alignSelf: 'flex-start',
                    mt: 1,
                  }}
                >
                  <DescriptionRounded fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: {
              maxLength: 500,
            },
          }}
          helperText={`${form.description?.length ?? 0}/500 karakter`}
          onChange={(event) => updateField('description', event.target.value)}
        />

        <TextField
          label="Fiyat"
          type="number"
          placeholder="Örn: 3000"
          value={form.price}
          fullWidth
          required
          disabled={loading}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentsRounded fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">₺</InputAdornment>
              ),
            },
            htmlInput: {
              min: 0,
              step: 0.01,
            },
          }}
          onChange={(event) =>
            updateField('price', Number(event.target.value))
          }
        />
      </Stack>
    </GenericModal>
  );
}