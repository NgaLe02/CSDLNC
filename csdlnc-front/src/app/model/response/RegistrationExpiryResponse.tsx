import { CarResponseModel } from "./CarResponseModel";

export class RegistrationExpiryResponse {
    maHanDangKiem?: number;
    maXe?: string;
    chiPhi?: number;
    ngayDangKiem?: string;
    hieuLuc?: number;

    xe?: CarResponseModel

    constructor(init?: Partial<RegistrationExpiryResponse>) {
        Object.assign(this, init);
    }
}
