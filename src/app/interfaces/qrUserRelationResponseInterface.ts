import { User } from "./userInfoInterface";
import { UserShowType } from "./userInfoInterface";

export interface QRUserRelationDetailResponseInterface {
    id: number;
    userQRRelationID: number;
    inUse: boolean;
    acceptContact: boolean;
    message: string | undefined;
    visibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    qrCode: object | undefined;
}

export interface QRUserRelationResponseInterface {
    id: number;
    userQRRelationID: number;
    inUse: boolean;
    acceptContact: boolean;
    message: string | undefined;
    visibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    qrCode: { id: number, isValid: boolean };
}