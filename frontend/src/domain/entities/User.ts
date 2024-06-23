export interface User {
    id: number;
    name: string;
    email: string;
    profilePhoto?: string;
    description?: string;
    address?: string;
    phone?: string;
    permissions: number; 
    // posts?: Post[];
}