import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  deadline: Yup.date().nullable().required('Deadline is required'),
});

interface Task {
  id?: string;
  title: string;
  description?: string;
  deadline?: string; // ISO string format
  status?: 'pending' | 'completed' | 'overdue' | 'removed';
}

interface TaskFormProps {
  onSubmit: (values: any) => void;
  initialValues: Task;
  isEdit?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues, isEdit = false }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleChange, handleBlur }) => (
        <Form>
          <DialogTitle>{isEdit ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogContent>
            <Box sx={{m: 2}}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                fullWidth
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box sx={{m: 2}}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                fullWidth
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box sx={{m: 2}}>
              <Field
                as={TextField}
                name="deadline"
                error={touched.deadline && !!errors.deadline}
                helperText={touched.deadline && errors.deadline}
                label="Deadline"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center'}} >
            <Button sx={{ width: 1/2, marginBottom: 2}} type="submit" variant="contained" color="success">{isEdit ? 'Save' : 'Add'}</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
