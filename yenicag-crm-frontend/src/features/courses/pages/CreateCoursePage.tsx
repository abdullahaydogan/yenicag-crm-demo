import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  ArrowBackRounded,
  AutoStoriesRounded,
  DescriptionRounded,
  PaymentsRounded,
  SaveRounded,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client/react';

import { CREATE_COURSE } from '../graphql/mutations';
import { GET_ALL_COURSES } from '../graphql/queries';

import type {
  CreateCourseRequest,
  CreateCourseResponse,
} from '../types/course.types';

const initialForm: CreateCourseRequest = {
  name: '',
  description: '',
  price: 0,
};

export default function CreateCoursePage() {
  const navigate = useNavigate();

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

  const validateForm = () => {
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
  };

  const handleSubmit = async () => {
    const validationMessage = validateForm();

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

    navigate('/courses');
  };

  return (
    <Box
      sx={{
        maxWidth: 920,
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
              }}
            >
              Create Course
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              Sisteme yeni bir kurs kaydı oluşturun.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate('/courses')}
          >
            Listeye Dön
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            borderRadius: '0 !important',
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2.5,
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
            }}
          >
            <Typography sx={{ fontWeight: 900 }}>
              Kurs Bilgileri
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Kurs adı, açıklama ve fiyat bilgilerini girin.
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ p: 3 }}>
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
              onChange={(event) =>
                updateField('name', event.target.value)
              }
            />

            <TextField
              label="Açıklama"
              placeholder="Kurs açıklaması girin"
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
              helperText={`${form.description?.length ?? 0}/500`}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
            />

            <TextField
              label="Fiyat"
              type="number"
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
                    <InputAdornment position="end">
                      ₺
                    </InputAdornment>
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

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: 'flex-end',
                pt: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/courses')}
                disabled={loading}
              >
                Vazgeç
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveRounded />}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kursu Kaydet'}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}