// src/modules/auth/infrastructure/services/JwtTokenService.ts
import jwt from "jsonwebtoken";

export class JwtTokenService {
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || "default_secret";
    }

    generateAccessToken(userId: string): string {
        return jwt.sign({ userId }, this.secretKey, { expiresIn: "1h" });
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign({ userId }, this.secretKey, { expiresIn: "7d" });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}
