export interface QRUserRelationDetailResponseInterface {
    id: number;
    userQRRelationID: number;
    inUse: boolean;
    acceptContact: boolean;
    message: string | undefined;
    visibility: number | undefined;
    useBackupNumber: boolean | undefined;
    user: object | undefined;
    qrCode: object | undefined;
}

export interface QRUserRelationResponseInterface {
    id: number;
    userQRRelationID: number;
    inUse: boolean;
    acceptContact: boolean;
    message: string | undefined;
    visibility: number | undefined;
    useBackupNumber: boolean | undefined;
    user: number;
    qrCode: { id: number, isValid: boolean };
}