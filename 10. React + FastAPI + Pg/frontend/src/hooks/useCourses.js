import { useCallback, useEffect, useState } from 'react';
import { coursesApi } from '../services/api';

export function useCourses(initialFilters = {}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.level) params.level = filters.level;
      if (filters.sortBy) params.sort_by = filters.sortBy;
      const res = await coursesApi.getAll(params);
      setCourses(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchCourses,
  };
}
