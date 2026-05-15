import { useState } from 'react';

import CrudPage from '../../../shared/components/crud/CrudPage';

import { courseColumns } from '../components/course-columns';
import CourseDetailDialog from '../components/CourseDetailDialog';
import CreateCourseDialog from '../components/CreateCourseDialog';
import { GET_ALL_COURSES } from '../graphql/queries';

import type {
  Course,
  GetAllCoursesResponse,
} from '../types/course.types';

export default function CoursesPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <CrudPage<Course, GetAllCoursesResponse>
        title="Kurslar"
        description="Sistemde kayıtlı kursları görüntüleyin."
        actionText="Yeni Kurs"
        query={GET_ALL_COURSES}
        dataKey="allCourses"
        columns={courseColumns}
        onActionClick={() => setCreateOpen(true)}
        renderDetail={(course, onClose) => (
          <CourseDetailDialog course={course} onClose={onClose} />
        )}
      />

      <CreateCourseDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
}