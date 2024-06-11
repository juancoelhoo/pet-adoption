export interface UpdateUserRequest {
  name?: string;
  password?: string;
  profilePhoto?: string; 
  description?: string;  
  address?: string; 
  phone?: string; 
  permissions?: number; 
}
