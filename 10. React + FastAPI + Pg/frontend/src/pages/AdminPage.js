import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { coursesApi, enrollmentsApi, studentsApi } from '../services/api';

const emptyCourse = {
  title: '',
  description: '',
  level: 'Beginner',
  duration: 10,
  popularity: 0,
};

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ pt: 3 }}>{children}</Box>;
}

export default function AdminPage() {
  const [tab, setTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState(emptyCourse);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [coursesRes, studentsRes, enrollmentsRes] = await Promise.all([
        coursesApi.getAll(),
        studentsApi.getAll(),
        enrollmentsApi.getAll(),
      ]);
      setCourses(coursesRes.data);
      setStudents(studentsRes.data);
      setEnrollments(enrollmentsRes.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateDialog = () => {
    setEditingCourse(null);
    setForm(emptyCourse);
    setDialogOpen(true);
  };

  const openEditDialog = (course) => {
    setEditingCourse(course);
    setForm({ ...course });
    setDialogOpen(true);
  };

  const handleSaveCourse = async () => {
    try {
      if (editingCourse) {
        await coursesApi.update(editingCourse.id, form);
      } else {
        await coursesApi.create(form);
      }
      setDialogOpen(false);
      loadData();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save course');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await coursesApi.delete(id);
      loadData();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete course');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Courses" />
        <Tab label="Students" />
        <Tab label="Enrollments" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Button startIcon={<AddIcon />} variant="contained" sx={{ mb: 2 }} onClick={openCreateDialog}>
          Add Course
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Popularity</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>{course.duration} hrs</TableCell>
                  <TableCell>{course.popularity}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => openEditDialog(course)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCourse(course.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>{enrollment.student?.name}</TableCell>
                  <TableCell>{enrollment.course?.title}</TableCell>
                  <TableCell>{enrollment.progress}%</TableCell>
                  <TableCell>{enrollment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            select
            label="Level"
            margin="normal"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Duration (hours)"
            type="number"
            margin="normal"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Popularity"
            type="number"
            margin="normal"
            value={form.popularity}
            onChange={(e) => setForm({ ...form, popularity: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCourse}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
