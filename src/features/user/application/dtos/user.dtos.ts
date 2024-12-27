export interface CreateUserDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ResponseUserDTO {
    id: string;
    name: string;
    lastName: string;
    email: string;
    roles: string[];
}
