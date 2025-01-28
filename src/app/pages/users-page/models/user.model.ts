export type User = {
    id: string;
    name: string;
    username?: string;
    email?: string;
    phone?: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    BARABULKA = 'barabulka',
}