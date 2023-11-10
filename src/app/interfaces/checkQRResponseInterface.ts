export interface CheckUserRelationResponseInterface {
    qrID: string;
    has: boolean;
    errorMessage: string;
    relationID: number | undefined;
}

export interface CheckQRResponseInterface {
    qrID: string;
    has: boolean;
}