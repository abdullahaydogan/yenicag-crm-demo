import type { NavigationItem } from './navigation.types';

export const navigationConfig: NavigationItem[] = [
  {
    id: 'education-management',
    title: 'Education Management',
    type: 'group',
    children: [
      {
        id: 'course-management',
        title: 'Course Management',
        type: 'collapse',
        children: [
          {
            id: 'get-all-courses',
            title: 'Get All Courses',
            type: 'item',
            url: '/courses',
          },
          {
            id: 'get-course-by-teacher',
            title: 'Get Course By Teacher',
            type: 'item',
            url: '/courses/by-teacher',
          },
          {
            id: 'create-course',
            title: 'Create Course',
            type: 'item',
            url: '/courses/create',
          },
        ],
      },
      {
        id: 'student-management',
        title: 'Student Management',
        type: 'collapse',
        children: [
          {
            id: 'get-all-students',
            title: 'Get All Students',
            type: 'item',
            url: '/students',
          },
          {
            id: 'create-student',
            title: 'Create Student',
            type: 'item',
            url: '/students/create',
          },
        ],
      },
      {
        id: 'teacher-management',
        title: 'Teacher Management',
        type: 'collapse',
        children: [
          {
            id: 'get-all-teachers',
            title: 'Get All Teachers',
            type: 'item',
            url: '/teachers',
          },
          {
            id: 'create-teacher',
            title: 'Create Teacher',
            type: 'item',
            url: '/teachers/create',
          },
        ],
      },
    ],
  },
  {
    id: 'accounting-management',
    title: 'Accounting Management',
    type: 'group',
    children: [
      {
        id: 'student-accounts',
        title: 'Student Accounts',
        type: 'collapse',
        children: [
          {
            id: 'student-accounts-list',
            title: 'Student Account List',
            type: 'item',
            url: '/accounting/students',
          },
        ],
      },
    ],
  },
];