export interface TransferResponse {
    origin: {
        id: string;
        balance: number;
    };
    destination: {
        id: string;
        balance: number;
    };
}