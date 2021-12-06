export interface User {
    order?: number;
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    imageURL: string;
    created_at: any;
    role: 'subscriber' | 'analyst' | 'editor' | 'admin';
}