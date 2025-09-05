import { CarResponseModel } from "./CarResponseModel";

export class MaintainenceScheduleResponse {
    maLichBaoDuong?: number;
    maXe?: string;
    chiPhi?: number;
    ngayBaoDuong?: string;

    xe?: CarResponseModel

    constructor(init?: Partial<MaintainenceScheduleResponse>) {
        Object.assign(this, init);
    }
}
