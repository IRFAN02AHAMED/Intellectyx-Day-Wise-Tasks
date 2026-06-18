import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const levelColors = {
  Beginner: 'success',
  Intermediate: 'warning',
  Advanced: 'error',
};

export default function CourseCard({ course, onEnroll, enrolled, enrolling }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="h2">
            {course.title}
          </Typography>
          <Chip label={course.level} color={levelColors[course.level] || 'default'} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
          {course.description}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TimerIcon fontSize="small" color="action" />
            <Typography variant="body2">{course.duration} hrs</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TrendingUpIcon fontSize="small" color="action" />
            <Typography variant="body2">{course.popularity}% popular</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        {onEnroll && (
          <Button
            fullWidth
            variant={enrolled ? 'outlined' : 'contained'}
            startIcon={<SchoolIcon />}
            disabled={enrolled || enrolling}
            onClick={() => onEnroll(course.id)}
          >
            {enrolled ? 'Enrolled' : enrolling ? 'Enrolling...' : 'Enroll'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
