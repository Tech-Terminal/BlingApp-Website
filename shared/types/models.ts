export interface AppClient {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
