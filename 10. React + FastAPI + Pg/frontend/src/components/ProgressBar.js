import { LinearProgress, Typography, Box } from '@mui/material';

export default function ProgressBar({ value, label }) {
  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}: {value}%
        </Typography>
      )}
      <LinearProgress variant="determinate" value={value} sx={{ height: 8, borderRadius: 4 }} />
    </Box>
  );
}
