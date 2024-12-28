// src/modules/auth/infrastructure/adapters/AuthAdapter.ts
import { AuthPort } from "../../../user/domain/ports/AuthPort";
import { TokenService } from "../services/TokenService";

export class AuthAdapter implements AuthPort {
    constructor(private readonly tokenService: TokenService) {}

    public async generateTokens(payload: { userId: string; roles: string[] }): Promise<{ accessToken: string; refreshToken: string }> {
        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);
        return { accessToken, refreshToken };
    }
}
