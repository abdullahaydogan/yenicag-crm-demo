export type NavigationItemType = 'group' | 'collapse' | 'item';

export type NavigationItem = {
  id: string;
  title: string;
  type: NavigationItemType;
  url?: string;
  icon?: string;
  children?: NavigationItem[];
};