export interface CheckUserRelationResponseInterface {
    qrID: string;
    has: boolean;
    errorMessage: string;
    isOwner: boolean;
    inUse: boolean;
    relationID: number | undefined;
}

export interface CheckQRResponseInterface {
    qrID: string;
    has: boolean;
}