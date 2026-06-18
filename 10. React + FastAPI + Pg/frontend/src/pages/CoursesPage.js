import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { enrollmentsApi } from '../services/api';

export default function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const { courses, loading, error, filters, setFilters } = useCourses();
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrollError, setEnrollError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    enrollmentsApi.getAll().then((res) => {
      setEnrolledIds(new Set(res.data.map((e) => e.course_id)));
    });
  }, [isAuthenticated]);

  const handleEnroll = async (courseId) => {
    setEnrollError('');
    setEnrollingId(courseId);
    try {
      await enrollmentsApi.create(courseId);
      setEnrolledIds((prev) => new Set([...prev, courseId]));
    } catch (err) {
      setEnrollError(err.response?.data?.detail || 'Enrollment failed');
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Courses
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Level</InputLabel>
          <Select
            label="Level"
            value={filters.level || ''}
            onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value || undefined }))}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={filters.sortBy || ''}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value || undefined }))}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {enrollError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {enrollError}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                course={course}
                onEnroll={isAuthenticated ? handleEnroll : null}
                enrolled={enrolledIds.has(course.id)}
                enrolling={enrollingId === course.id}
              />
            </Grid>
          ))}
          {courses.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary">No courses found.</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
