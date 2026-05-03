export type ProjectCategory = 'Web Design' | 'Graphic Design';

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  category: ProjectCategory;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'admin' | 'user';
  createdAt: any;
}

export interface Notification {
  id?: string;
  type: 'registration' | 'contact' | 'interaction';
  message: string;
  userEmail?: string;
  createdAt: any;
  read: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}
