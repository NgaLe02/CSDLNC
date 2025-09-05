import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MaintainenceScheduleService } from "../../../../services/MaintainenceScheduleService";
import { MaintainenceScheduleResponse } from "../../../../model/response/MaintainenceScheduleResponse";
import dayjs from "dayjs";
import { HttpStatusCode } from "axios";
import { MaintainenceSchedule } from "../../../../model/MaintainenceSchedule";

export default function BaoDuongForm(props: any) {
  const [listBaoDuong, setListbaoDuong] = useState<
    MaintainenceScheduleResponse[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<MaintainenceSchedule>(
    new MaintainenceSchedule()
  );
  const [nextTimeBaoDuong, setNextTimeBaoDuong] = useState<any>();

  useEffect(() => {
    if (props.model.maXe) {
      getLstMaintainenceScheduleToCar();
      getNextTimeBaoDuongToCar();
    }
  }, [props.model.maXe]);

  function getLstMaintainenceScheduleToCar() {
    MaintainenceScheduleService.getInstance()
      .getLstMaintainenceScheduleToCar({ maXe: props.model.maXe })
      .then((response) => {
        if (response.data.status) {
          const data = response.data.responseData;
          setListbaoDuong(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra");
        }
      });
  }

  function getNextTimeBaoDuongToCar() {
    MaintainenceScheduleService.getInstance()
      .getNextTimeBaoDuongToCar({ maXe: props.model.maXe })
      .then((response) => {
        if (response.data.status) {
          const data = response.data.responseData;
          setNextTimeBaoDuong(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err: any) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra");
        }
      });
  }

  function handleDelete(id: number) {
    MaintainenceScheduleService.getInstance()
      .deleteMaintainenceSchedule(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstMaintainenceScheduleToCar();
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra");
        }
      });
  }

  const handleAdd = () => {
    setNewItem({
      maXe: props.model.maXe,
      ngayBaoDuong: new Date().toISOString(),
      chiPhi: 0,
    } as MaintainenceScheduleResponse);
    setEditingId("new");
  };

  const handleEdit = (item: MaintainenceScheduleResponse) => {
    if (item.maLichBaoDuong) {
      setEditingId(item.maLichBaoDuong?.toString());
      setNewItem({ ...item });
    }
  };

  const handleSave = () => {
    if (editingId === "new") {
      MaintainenceScheduleService.getInstance()
        .saveMaintainenceSchedule(newItem)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstMaintainenceScheduleToCar();
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    } else {
      MaintainenceScheduleService.getInstance()
        .updateMaintainenceSchedule(newItem)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstMaintainenceScheduleToCar();
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    }
    setEditingId(null);
    setNewItem({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewItem({});
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0"></h6>
          <button className="btn btn-sm btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                <th scope="col" style={{ width: "5%" }}>
                  STT
                </th>
                <th scope="col">Ngày bảo dưỡng</th>
                <th scope="col">Chi phí (VNĐ)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listBaoDuong.map((item, index) =>
                editingId == item.maLichBaoDuong?.toString() ? (
                  <tr key={item.maLichBaoDuong}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={dayjs(newItem?.ngayBaoDuong).format(
                          "YYYY-MM-DD"
                        )}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem!,
                            ngayBaoDuong: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={newItem?.chiPhi ?? ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem!,
                            chiPhi: Number(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={handleSave}
                      >
                        Lưu
                      </button>
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={handleCancel}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.maLichBaoDuong}>
                    <td>{index + 1}</td>
                    <td>{dayjs(item.ngayBaoDuong).format("DD-MM-YYYY")}</td>
                    <td>{item.chiPhi?.toLocaleString("vi-vn")}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maLichBaoDuong!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )
              )}

              {editingId === "new" && (
                <tr>
                  <td>{listBaoDuong.length + 1}</td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={dayjs(newItem?.ngayBaoDuong).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem!,
                          ngayBaoDuong: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={newItem?.chiPhi ?? ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem!,
                          chiPhi: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleSave}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={handleCancel}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h6 className="mt-3">
          Thời gian bảo dưỡng dự kiến tiếp theo:{" "}
          {dayjs(nextTimeBaoDuong?.ngayBaoDuongTiepTheo).format("DD-MM-YYYY")}
        </h6>
        <h6 className="mt-3">
          Số km đã chạy kể từ lần bảo dưỡng gần nhất:{" "}
          {nextTimeBaoDuong?.soKmDaChay?.toLocaleString("vi-vn")} km
        </h6>
      </div>
    </div>
  );
}
