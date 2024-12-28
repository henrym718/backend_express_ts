import { UserOptionalProps, UserProps, UserRequiredProps } from "./UserProperties";

export class User {
    private constructor(private readonly props: UserProps) {
        this.props = {
            ...props,
            active: props.active ?? true,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    static create(props: UserRequiredProps) {
        return new User(props);
    }

    static reconstitute(props: UserRequiredProps & UserOptionalProps) {
        return new User(props);
    }

    public toJSON() {
        return {
            id: this.props.id.getValue(),
            name: this.props.name.getValue(),
            lastName: this.props.lastName.getValue(),
            email: this.props.email.getValue(),
            password: this.props.password.getValue(),
            roles: this.props.roles,
            active: this.props.active,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            deletedAt: this.props.deletedAt,
        };
    }
}
