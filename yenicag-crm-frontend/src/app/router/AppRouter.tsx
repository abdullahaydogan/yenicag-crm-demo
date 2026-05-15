import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../../layouts/DashboardLayout';

import DashboardPage from '../../pages/dashboard/DashboardPage';
import CoursesPage from '../../features/courses/pages/CoursesPage';
import CreateCoursePage from '../../features/courses/pages/CreateCoursePage';
import StudentsPage from '../../features/students/pages/StudentsPage';
import StudentAccountingDetailPage from '../../features/accounting/page/StudentAccountingDetailPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/create" element={<CreateCoursePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/accounting/students/:id" element={<StudentAccountingDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}