import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Chip,
  Slider,
  Button,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import ProgressBar from '../components/ProgressBar';
import { enrollmentsApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await enrollmentsApi.getAll();
      setEnrollments(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleProgressChange = (id, value) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, progress: value } : e))
    );
  };

  const handleSaveProgress = async (enrollment) => {
    setUpdatingId(enrollment.id);
    try {
      await enrollmentsApi.update(enrollment.id, { progress: enrollment.progress });
      await fetchEnrollments();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update progress');
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = {
    total: enrollments.length,
    completed: enrollments.filter((e) => e.status === 'completed').length,
    inProgress: enrollments.filter((e) => e.status === 'enrolled').length,
    avgProgress:
      enrollments.length > 0
        ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
        : 0,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Track your course progress and manage enrollments.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Enrollments', value: stats.total },
          { label: 'In Progress', value: stats.inProgress },
          { label: 'Completed', value: stats.completed },
          { label: 'Avg Progress', value: `${stats.avgProgress}%` },
        ].map((stat) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">{stat.value}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : enrollments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            You haven&apos;t enrolled in any courses yet. Browse courses to get started!
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {enrollments.map((enrollment) => (
            <Paper key={enrollment.id} sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">{enrollment.course?.title || `Course #${enrollment.course_id}`}</Typography>
                <Chip
                  label={enrollment.status}
                  color={enrollment.status === 'completed' ? 'success' : 'primary'}
                  size="small"
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {enrollment.course?.level} · {enrollment.course?.duration} hrs
              </Typography>
              <ProgressBar value={enrollment.progress} />
              {enrollment.status !== 'completed' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Update Progress
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Slider
                      value={enrollment.progress}
                      onChange={(_, value) => handleProgressChange(enrollment.id, value)}
                      min={0}
                      max={100}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={updatingId === enrollment.id}
                      onClick={() => handleSaveProgress(enrollment)}
                    >
                      Save
                    </Button>
                  </Stack>
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
}
