export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface BankAccount {
    account_id: string;
    bank_id: string;
    account_type: string;
    name?: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface Application {
    id: number;
    account_id: string;
    amount: number;
    date: string;
    created_at: Date;
    updated_at: Date;
}
