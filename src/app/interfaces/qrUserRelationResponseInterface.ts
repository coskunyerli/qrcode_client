import { User } from "./userInfoInterface";
import { UserShowType } from "./userInfoInterface";

export interface QRUserRelationDetailResponseInterface {
    id: number;
    name: string;
    description: string;
    inUse: boolean;
    acceptContact: boolean;
    showPhoneNumber: boolean;
    showMessage: boolean;
    message: string | undefined;
    dataVisibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    qrCode: { id: number, isValid: boolean } | undefined;
}

export interface QRUserRelationResponseInterface {
    id: number;
    inUse: boolean;
    name: string;
    description: string;
    acceptContact: boolean;
    showPhoneNumber: boolean;
    showMessage: boolean;
    message: string | undefined;
    dataVisibility: UserShowType;
    useBackupNumber: boolean | undefined;
    user: User | undefined;
    foundQRList: Array<{ id: number, message: string, createdDate: string, hasContact: boolean }>;
    qrCode: { id: number, isValid: boolean };
}

export interface QRUserRelationCreateResponseInterface {
    relationID: number;
    message: string;
    isNew: boolean;
    qrID: string;
}