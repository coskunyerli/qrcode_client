import { User } from "./userInfoInterface";
import { UserShowType } from "./userInfoInterface";

export interface QRUserRelationDetailResponseInterface {
    id: number;
    inUse: boolean;
    acceptContact: boolean;
    showPhoneNumber: boolean;
    showMessage: boolean;
    message: string | undefined;
    dataVisibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    qrCode: object | undefined;
}

export interface QRUserRelationResponseInterface {
    id: number;
    inUse: boolean;
    acceptContact: boolean;
    showPhoneNumber: boolean;
    showMessage: boolean;
    message: string | undefined;
    dataVisibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    foundQRList: Array<{ id: number, message: string }>;
    qrCode: { id: number, isValid: boolean };
}

export interface QRUserRelationCreateResponseInterface {
    relationID: number;
    message: string;
    isNew: boolean;
    qrID: string;
}