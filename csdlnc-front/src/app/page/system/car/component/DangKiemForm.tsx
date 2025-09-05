import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CarModel } from "../../../../model/CarModel";
import { CarService } from "../../../../services/CarService";
import dayjs from "dayjs";
import { RegistrationExpiryService } from "../../../../services/RegistrationExpiryService";
import { RegistrationExpiryResponse } from "../../../../model/response/RegistrationExpiryResponse";
import { HttpStatusCode } from "axios";

export default function DangKiemForm(props: any) {
  const [model, setModel] = useState<CarModel>(props.model ?? new CarModel());
  const [listDangKiem, setListDangKiem] = useState<
    RegistrationExpiryResponse[]
  >([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<RegistrationExpiryResponse>(
    new RegistrationExpiryResponse()
  );

  useEffect(() => {
    if (props.model.maXe) {
      getLstRegistrationExpiryToCar();
    }
  }, [props.model.maXe]);

  function getLstRegistrationExpiryToCar() {
    RegistrationExpiryService.getInstance()
      .getLstRegistrationExpiryToCar({ maXe: props.model.maXe })
      .then((response) => {
        if (response.data.status) {
          const data = response.data.responseData;
          setListDangKiem(data);
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
    RegistrationExpiryService.getInstance()
      .deleteRegistrationExpiry(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstRegistrationExpiryToCar();
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
      ngayDangKiem: dayjs(new Date()).format("YYYY-MM-DD"),
      chiPhi: 0,
    } as RegistrationExpiryResponse);
    setEditingId("new");
  };

  const handleEdit = (item: RegistrationExpiryResponse) => {
    if (item.maHanDangKiem) {
      setEditingId(item.maHanDangKiem?.toString());
      setNewItem({ ...item });
    }
  };

  const handleSave = () => {
    if (editingId === "new") {
      RegistrationExpiryService.getInstance()
        .saveRegistrationExpiry(newItem)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstRegistrationExpiryToCar();
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
      RegistrationExpiryService.getInstance()
        .updateRegistrationExpiry(newItem)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstRegistrationExpiryToCar();
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
                <th scope="col">Ngày đăng kiểm</th>
                <th scope="col">Hiệu lực (tháng)</th>
                <th scope="col">Chi phí (VNĐ)</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listDangKiem.map((item, index) =>
                editingId == item.maHanDangKiem?.toString() ? (
                  <tr key={item.maHanDangKiem}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={dayjs(newItem?.ngayDangKiem).format(
                          "YYYY-MM-DD"
                        )}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem!,
                            ngayDangKiem: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={newItem?.hieuLuc ?? ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem!,
                            hieuLuc: Number(e.target.value),
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
                  <tr key={item.maHanDangKiem}>
                    <td>{index + 1}</td>
                    <td>{dayjs(item.ngayDangKiem).format("DD-MM-YYYY")}</td>
                    <td>{item.hieuLuc}</td>
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
                        onClick={() => handleDelete(item.maHanDangKiem!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )
              )}

              {editingId === "new" && (
                <tr>
                  <td>{listDangKiem.length + 1}</td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={dayjs(newItem?.ngayDangKiem).format("YYYY-MM-DD")}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem!,
                          ngayDangKiem: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={newItem?.hieuLuc ?? ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem!,
                          hieuLuc: Number(e.target.value),
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
          Thời gian đăng kiểm tiếp theo:{" "}
          {listDangKiem.length > 0
            ? dayjs(listDangKiem[0].ngayDangKiem)
                .add(listDangKiem[0].hieuLuc ?? 0, "month")
                .format("DD-MM-YYYY")
            : "Chưa có"}
        </h6>
      </div>
    </div>
  );
}
