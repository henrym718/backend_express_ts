export interface Repository<T> {
    create(data: T): Promise<T>;
    update(id: string, data: Partial<T>): Promise<void>;
}
