export interface CheckUserRelationResponseInterface {
    qrID: string;
    has: boolean;
    errorMessage: string;
    userQRRelationID: number | undefined;
}

export interface CheckQRResponseInterface {
    qrID: string;
    has: boolean;
}