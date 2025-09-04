import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PaginationCommon from "../../common/PaginationCommon";
import dayjs from "dayjs";
import { RequestService } from "../../services/RequestService";


export default function Request02() {
    const [modelSearch, setModelSearch] = useState<any>(
        {
            limit: 10,
            page: 1,
            time: new Date().getTime(),
            fromDate: '2025-08-01',
            toDate: '2025-09-01',
        });
    const [listData, setListData] = useState<any[]>([]);
    const totalElement = useRef(0);

    useEffect(() => {
        getCarRevenue();
    }, [modelSearch.time]);


    function getCarRevenue() {
        RequestService.getInstance()
            .getCarRevenue(modelSearch)
            .then((response) => {
                if (response.status === HttpStatusCode.Ok) {
                    if (response.data.status) {
                        const data = response.data.responseData.data;
                        setListData(data);
                    } else {
                        toast.error(response.data.message);
                    }
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra");
            });
    }

    const handlePageChange = (page: number) => {
        setModelSearch({
            ...modelSearch,
            page: page,
            time: new Date().getTime()
        });
    };

    const handleChangeSearch = (event: any) => {
        setModelSearch({
            ...modelSearch,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light rounded p-4">
                    <form className="row g-3">
                        {/* Tìm theo họ tên / số điện thoại */}
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="keyword">Xe</label>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Mã xe, biển số"
                                name="keyword"
                                onChange={(e) => handleChangeSearch(e)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        setModelSearch((prev: any) => ({
                                            ...prev,
                                            time: new Date().getTime()
                                        }));
                                    }
                                }}
                            />
                        </div>

                        {/* Thời gian (theo tháng) */}
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="month">Tháng</label>
                            <input
                                type="month"
                                className="form-control"
                                value={
                                    modelSearch.fromDate
                                        ? modelSearch.fromDate.slice(0, 7) // chỉ lấy "YYYY-MM"
                                        : ""
                                }
                                name="month"
                                onChange={(e) => {
                                    const value = e.target.value; // ví dụ: "2025-09"
                                    const [year, month] = value.split("-");
                                    const fromDate = `${year}-${month}-01`;
                                    const toDate = new Date(Number(year), Number(month), 0) // ngày cuối tháng
                                        .toISOString()
                                        .split("T")[0];

                                    handleChangeSearch({ target: { name: "fromDate", value: fromDate } });
                                    handleChangeSearch({ target: { name: "toDate", value: toDate } });
                                }}
                            />
                        </div>

                        <div className="col-md-2 d-flex align-items-end">
                            <label className="form-label" htmlFor="role"></label>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => {
                                    setModelSearch((prev: any) => ({
                                        ...prev,
                                        time: new Date().getTime()
                                    }));
                                }}
                            >
                                Tìm kiếm
                            </button>
                        </div>

                    </form>
                </div>
            </div>


            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-dark">
                                    <th scope="col" style={{ width: "5%" }}>
                                        STT
                                    </th>
                                    <th scope="col">Mã xe</th>
                                    <th scope="col">Biển số</th>
                                    <th scope="col">Doanh thu</th>
                                    <th scope="col">Số chuyến</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listData.map(
                                    (item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.maXe}</td>
                                            <td>{item.bienSo}</td>
                                            <td>{item.doanhThu}</td>
                                            <td>{item.tongSoChuyen}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-2">
                        <PaginationCommon
                            currentPage={modelSearch.page}
                            count={totalElement.current}
                            onPageChange={handlePageChange}
                            rows={modelSearch.limit}
                        />
                    </div>

                </div>
            </div>


        </>
    );
}
