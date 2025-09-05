export class MaintainenceSchedule {
    maLichBaoDuong?: number;
    maXe?: string;
    chiPhi?: number;
    ngayBaoDuong?: string;

    constructor(init?: Partial<MaintainenceSchedule>) {
        Object.assign(this, init);
    }
}
