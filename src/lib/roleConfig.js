export const MENU_CONFIG = [
  { key: 'dashboard',   label: 'Dashboard Overview', roles: ['employee', 'manager', 'admin', 'supermanager'] },
  { key: 'attendance',  label: 'Auto Attendance',    roles: ['employee', 'manager', 'admin', 'supermanager'] },
  { key: 'leave',       label: 'Leave Requests',     roles: ['employee', 'manager', 'admin', 'supermanager'] },
  { key: 'logs',        label: 'Daily Work Logs',    roles: ['employee', 'manager', 'admin', 'supermanager'] },
  { key: 'performance', label: 'AI Performance',     roles: ['employee', 'manager', 'admin', 'supermanager'] },
  { key: 'governance',  label: 'Team Governance',    roles: ['manager', 'admin', 'supermanager'] },
  { key: 'analytics',   label: 'Executive Analytics',roles: ['admin', 'supermanager'] },
];

export const getVisibleMenu = (userRole) => {
  return MENU_CONFIG.filter(item => item.roles.includes(userRole));
};

export const canViewAllRecords = (role) => ['manager', 'admin', 'supermanager'].includes(role);
export const canApproveLeave = (role) => ['manager', 'admin', 'supermanager'].includes(role);

export const normalizeRole = (backendRole) => {
  if (!backendRole) return 'employee';
  const cleaned = backendRole.toUpperCase().replace(/[\s-]/g, '_');
  
  const roleMap = {
    'EMPLOYEE': 'employee',
    'MANAGER': 'manager',
    'ADMIN': 'admin',
    'SUPER_ADMIN': 'supermanager',
    'SUPERADMIN': 'supermanager',
    'SUPER_MANAGER': 'supermanager',
    'SUPERMANAGER': 'supermanager',
  };
  
  return roleMap[cleaned] || 'employee';
};