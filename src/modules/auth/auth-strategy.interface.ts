import { Request, Response } from "express";

// DTO's
interface AuthTokensDTO {
    accessToken: string;
    refreshToken: string;
}

class LoginDto {
    email!: string;
    password?: string;
    idToken?: string;
}

interface CreateUserDTO {
    email: string;
    password?: string;
    userType: "CLIENT" | "VENDOR";
    username: string;
    provider: string;
}

// Strategy Interface
interface AuthStrategy {
    authenticate(credentials: any): Promise<AuthTokensDTO>;
}

// Implementations
class EmailAuthStrategy implements AuthStrategy {
    authenticate(credentials: any): Promise<AuthTokensDTO> {
        // Validate email and password
        // Call the auth service
        // Generate tokens
        // Return tokens
        throw new Error("Method not implemented.");
    }
}

class GoogleAuthStrategy implements AuthStrategy {
    authenticate(credentials: any): Promise<AuthTokensDTO> {
        // Validate Google token
        // Call the auth service
        // Generate tokens
        // Return tokens
        throw new Error("Method not implemented.");
    }
}

//Cuse Case
class AuthUseCase {
    constructor(private readonly strategy: AuthStrategy) {}

    async execute(credentials: LoginDto): Promise<AuthTokensDTO> {
        return await this.strategy.authenticate(credentials);
    }
}

// Crotroller
class AuthController {
    constructor(public authUseCase: AuthUseCase) {}

    async login(req: Request, res: Response) {
        try {
            const credentials = req.body;
            const tokens = await this.authUseCase.execute(credentials);
            res.json(tokens);
        } catch (error) {}
    }
}

//Emtities
abstract class User {
    constructor(
        protected readonly id: string,
        protected readonly email: string,
        protected readonly password: string,
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

// interface UserRepository {
//     save(user: BaseUser): Promise<void>;
//     findById(id: string): Promise<BaseUser | null>;
//     findByEmail(email: string): Promise<BaseUser | null>;
//     findByProviderUserId(provider: string, providerUserId: string): Promise<BaseUser | null>;
// }

// class AuthenticationService {
//     private providers: Map<string, AuthenticationProvider> = new Map();

//     constructor(
//         private readonly userRepository: UserRepository,
//         private readonly userFactory: UserFactory
//     ) {
//         this.providers.set('email', new EmailPasswordProvider());
//         this.providers.set('google', new GoogleAuthProvider());
//     }

//     async authenticate(provider: string, credentials: unknown): Promise<BaseUser> {
//         const authProvider = this.providers.get(provider);
//         if (!authProvider) {
//             throw new Error(`Provider ${provider} not supported`);
//         }

//         const result = await authProvider.authenticate(credentials);

//         let user = await this.userRepository.findByProviderUserId(
//             result.provider,
//             result.providerUserId
//         );

//         if (!user) {
//             // Crear nuevo usuario usando la factory
//             user = await UserFactory.createCustomer({
//                 email: result.email,
//                 username: result.email.split('@')[0],
//                 provider: result.provider,
//                 providerUserId: result.providerUserId
//             });

//             await this.userRepository.save(user);
//         }

//         return user;
//     }
// }
