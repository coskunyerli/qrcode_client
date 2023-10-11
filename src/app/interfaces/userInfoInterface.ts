export interface User {
    createdDate: Date;
    email: string | undefined
    password: string | undefined
    dataVisibility: UserShowType
    phoneNumber: string | undefined
    backupPhoneNumber: string | undefined
    lastUpdated: Date;
    first_name: string | undefined
    last_name: string | undefined
    is_staff: boolean
    is_active: boolean
    date_joined: Date
}
export enum UserShowType{
    INVISIBLE = 0,
    VISIBLE = 1,
    MESSAGE_VISIBLE = 2,
    CUSTOM = 3
}