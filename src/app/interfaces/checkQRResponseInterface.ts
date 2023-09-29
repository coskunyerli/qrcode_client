export interface CheckQRResponseInterface {
    qrID: string;
    has: boolean;
    errorMessage: string;
    userQRRelationID: number | undefined;
}