import { useMemo, useState } from 'react';

import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import {
  AutoStoriesRounded,
  DashboardRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  GroupsRounded,
  SchoolRounded,
} from '@mui/icons-material';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { navigationConfig } from '../app/navigation/navigation.config';
import type { NavigationItem } from '../app/navigation/navigation.types';

const drawerWidth = 292;

const iconMap: Record<string, React.ReactNode> = {
  'education-management': <SchoolRounded />,
  'course-management': <AutoStoriesRounded />,
  'student-management': <GroupsRounded />,
  'teacher-management': <SchoolRounded />,
  'get-all-courses': <DashboardRounded />,
};

function hasActiveChild(item: NavigationItem, pathname: string): boolean {
  if (item.url === pathname) {
    return true;
  }

  return item.children?.some((child) => hasActiveChild(child, pathname)) ?? false;
}

export default function DashboardLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const defaultOpenGroups = useMemo(() => {
    const result: Record<string, boolean> = {};

    const collectActiveParents = (items: NavigationItem[]) => {
      items.forEach((item) => {
        if (item.children?.length && hasActiveChild(item, location.pathname)) {
          result[item.id] = true;
        }

        if (item.children?.length) {
          collectActiveParents(item.children);
        }
      });
    };

    collectActiveParents(navigationConfig);

    return result;
  }, [location.pathname]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'course-management': true,
    ...defaultOpenGroups,
  });

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    if (item.type === 'group') {
      return (
        <Box key={item.id} sx={{ mt: 3 }}>
          <Typography
            sx={{
              px: 2,
              mb: 1.5,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: '#64748b',
            }}
          >
            {item.title}
          </Typography>

          <List
            sx={{
              display: 'grid',
              gap: 0.5,
            }}
          >
            {item.children?.map((child) =>
              renderNavigationItem(child, depth),
            )}
          </List>
        </Box>
      );
    }

    if (item.type === 'collapse') {
      const isActive = hasActiveChild(item, location.pathname);

      const isOpen = openGroups[item.id] || isActive;

      return (
        <Box key={item.id}>
          <ListItemButton
            selected={isActive}
            onClick={() => toggleGroup(item.id)}
            sx={{
              color: '#e2e8f0',
              px: 2,
              py: 1.4,
              minHeight: 48,
              ml: depth,

              transition: 'all .18s ease',

              '&.Mui-selected': {
                color: '#ffffff',
                background: 'rgba(37,99,235,.18)',
                borderLeft: '3px solid #3b82f6',
              },

              '&.Mui-selected:hover': {
                background: 'rgba(37,99,235,.28)',
              },

              '&:hover': {
                background: 'rgba(255,255,255,.05)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: isActive ? '#60a5fa' : '#94a3b8',
              }}
            >
              {iconMap[item.id] ?? <DashboardRounded />}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: isActive ? 800 : 600,
                  },
                },
              }}
            />

            {isOpen ? (
              <ExpandLessRounded fontSize="small" />
            ) : (
              <ExpandMoreRounded fontSize="small" />
            )}
          </ListItemButton>

          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List
              sx={{
                ml: 3.2,
                borderLeft: '1px solid rgba(148,163,184,.16)',
                display: 'grid',
                gap: 0.2,
              }}
            >
              {item.children?.map((child) =>
                renderNavigationItem(child, depth + 1),
              )}
            </List>
          </Collapse>
        </Box>
      );
    }

    const selected = item.url === location.pathname;

    return (
      <ListItemButton
        key={item.id}
        selected={selected}
        onClick={() => item.url && navigate(item.url)}
        sx={{
          color: selected ? '#ffffff' : '#cbd5e1',
          px: 2,
          py: 1,
          ml: depth,
          minHeight: 40,

          transition: 'all .18s ease',

          '&.Mui-selected': {
            background: 'rgba(59,130,246,.16)',
            borderLeft: '3px solid #60a5fa',
          },

          '&.Mui-selected:hover': {
            background: 'rgba(59,130,246,.22)',
          },

          '&:hover': {
            background: 'rgba(255,255,255,.05)',
          },
        }}
      >
        <Box
          sx={{
            width: 5,
            height: 5,
            mr: 1.5,
            background: selected
              ? '#60a5fa'
              : 'rgba(148,163,184,.45)',
          }}
        />

        <ListItemText
          primary={item.title}
          slotProps={{
            primary: {
              sx: {
                fontSize: 13,
                fontWeight: selected ? 700 : 500,
              },
            },
          }}
        />
      </ListItemButton>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 0,
            borderRadius: '0 !important',
            background:
              'linear-gradient(180deg,#020617 0%,#0f172a 50%,#111827 100%)',
            color: '#fff',
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: 90,
            px: 2.5,
            borderBottom: '1px solid rgba(148,163,184,.12)',
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              display: 'grid',
              placeItems: 'center',
              mr: 1.5,

              background:
                'linear-gradient(135deg,#2563eb,#7c3aed)',

              fontWeight: 900,
              fontSize: 16,

              boxShadow:
                '0 10px 25px rgba(37,99,235,.28)',
            }}
          >
            YC
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: -.5,
                lineHeight: 1,
              }}
            >
              Yeni Çağ CRM
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: '#94a3b8',
                fontWeight: 600,
              }}
            >
              Education Management
            </Typography>
          </Box>
        </Toolbar>

        <Box
          sx={{
            px: 1.2,
            py: 2,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <List sx={{ pb: 3 }}>
            {navigationConfig.map((item) =>
              renderNavigationItem(item),
            )}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          overflow: 'hidden',
          p: 4,
          background: '#f8fafc',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}