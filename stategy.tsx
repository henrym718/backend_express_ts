// Value Objects
class Email {
    private readonly value: string;

    constructor(email: string) {
        if (!this.validate(email)) {
            throw new Error("Invalid email format");
        }
        this.value = email;
    }

    private validate(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    toString(): string {
        return this.value;
    }
}

class Password {
    private readonly value: string;

    constructor(password: string) {
        if (!this.validate(password)) {
            throw new Error("Password must be at least 8 characters long");
        }
        this.value = password;
    }

    private validate(password: string): boolean {
        return password.length >= 8;
    }

    toString(): string {
        return this.value;
    }
}

// DTOs
interface CreateUserDTO {
    email: string;
    password: string;
    userType: "CLIENT" | "VENDOR";
    name: string;
}

interface LoginDTO {
    email: string;
    password: string;
}

interface AuthTokensDTO {
    accessToken: string;
    refreshToken: string;
}

// Domain Models
abstract class User {
    constructor(
        protected readonly id: string,
        protected readonly email: Email,
        protected readonly password: Password,
        protected readonly name: string
    ) {}

    abstract getUserType(): string;
}

class Client extends User {
    getUserType(): string {
        return "CLIENT";
    }
}

class Vendor extends User {
    getUserType(): string {
        return "VENDOR";
    }
}

// Auth Strategy Interface
interface AuthStrategy {
    login(credentials: LoginDTO): Promise<AuthTokensDTO>;
    validate(token: string): Promise<boolean>;
}

// Concrete Strategies
class EmailPasswordStrategy implements AuthStrategy {
    async login(credentials: LoginDTO): Promise<AuthTokensDTO> {
        // Implementación real aquí
        return {
            accessToken: "jwt-token",
            refreshToken: "refresh-token",
        };
    }

    async validate(token: string): Promise<boolean> {
        // Implementación real aquí
        return true;
    }
}

class GoogleStrategy implements AuthStrategy {
    async login(credentials: LoginDTO): Promise<AuthTokensDTO> {
        // Implementación pendiente
        throw new Error("Not implemented");
    }

    async validate(token: string): Promise<boolean> {
        // Implementación pendiente
        throw new Error("Not implemented");
    }
}

// Auth Service
class AuthService {
    private strategies: Map<string, AuthStrategy>;

    constructor() {
        this.strategies = new Map();
        this.strategies.set("email", new EmailPasswordStrategy());
        this.strategies.set("google", new GoogleStrategy());
    }

    async login(strategy: string, credentials: LoginDTO): Promise<AuthTokensDTO> {
        const authStrategy = this.strategies.get(strategy);
        if (!authStrategy) {
            throw new Error("Invalid auth strategy");
        }
        return authStrategy.login(credentials);
    }

    async validateToken(token: string): Promise<boolean> {
        // Aquí podrías determinar el tipo de token y usar la estrategia correspondiente
        const emailStrategy = this.strategies.get("email");
        return emailStrategy!.validate(token);
    }
}

// User Service
class UserService {
    async createUser(dto: CreateUserDTO): Promise<User> {
        const email = new Email(dto.email);
        const password = new Password(dto.password);

        const user =
            dto.userType === "CLIENT"
                ? new Client(crypto.randomUUID(), email, password, dto.name)
                : new Vendor(crypto.randomUUID(), email, password, dto.name);

        // Aquí iría la lógica de persistencia

        return user;
    }
}
