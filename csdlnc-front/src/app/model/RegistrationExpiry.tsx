export class RegistrationExpiry {
    maHanDangKiem?: number;
    maXe?: string;
    chiPhi?: number;
    ngayDangKiem?: string;
    hieuLuc?: number;

    constructor(init?: Partial<RegistrationExpiry>) {
        Object.assign(this, init);
    }
}
