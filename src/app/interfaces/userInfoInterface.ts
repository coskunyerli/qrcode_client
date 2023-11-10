export interface User {
    id: number;
    email: string
    phoneNumber: string
    backupPhoneNumber: string | null
    first_name: string
    last_name: string

}

export enum UserShowType {
    INVISIBLE = 0,
    VISIBLE = 1,
    MESSAGE_VISIBLE = 2,
    CUSTOM = 3
}

export interface FoundPersonOTPResponseInterface {
    qrID: string;
    qRUserRelation: number;
    dataVisibility: UserShowType;
    hasContact: boolean;
    hasMessage: boolean;
    message: string;
    isNotificationsSent: boolean;
    founderID: number | undefined
}

export interface ConfirmFoundPersonOTPResponseInterface {
    qrID: string;
    message: string;
}