export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string; 
  description?: string;  
  address?: string; 
  phone?: string; 
  permissions?: number; 
}
