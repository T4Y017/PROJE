export default interface User {
    id: number;
    username: string;
    surname: string;
    mail: string;
    tel: string;
    firmName: string;
    firmId: number;
    status: string;
    role: UserRole;
    birthdate: string;
    gender: string;
    known_language: string;
    password: number; // Optional for some operations
    permissions: Permission[];
}
export enum UserRole {
    Admin = "admin",
    Gözlemci = "gözlemci",
    User = "user",
}

export enum Permission {
    Edit = "edit",
    Delete = "delete",
    AddUser = "addUser",
}
