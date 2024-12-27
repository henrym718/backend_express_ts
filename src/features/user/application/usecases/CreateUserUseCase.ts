// import { CreateUserDTO } from "../dtos/user.dtos";
// import { UserFactory } from "../../domain/factories/user.factory";
// import { UserRepository } from "../../domain/respositories/user.repository";
// // import { AuthPort } from "../../domain/ports/AuthPort";

// export class CreateUserUseCase {
//     constructor(
//         private readonly userRepository: UserRepository // Repositorio de User // private readonly authPort: AuthPort // Puerto de Auth
//     ) {}

//     public async execute(dto: CreateUserDTO): Promise<{ accessToken: string; refreshToken: string }> {
//         // 1. Crear la entidad User
//         // const user = UserFactory.create(dto.id, dto.firstName, dto.lastName, dto.email, dto.password);

//         // 2. Guardar en el repositorio de usuarios
//         // await this.userRepository.save(user);

//         // 3. Generar los tokens usando el puerto AuthPort
//         // const tokens = await this.authPort.generateTokens({
//         //     userId: user.id.value,
//         //     roles: user.roles.map((role) => role.value),
//         // });

//         // 4. Retornar los tokens
//         return tokens;
//     }
// }
