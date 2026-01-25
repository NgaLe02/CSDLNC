import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DuanModel } from "../../model/DuanModel";
import { DuanService } from "../../services/DuanService";
import DuanForm from "./component/DuanForm";

const DuanPage: React.FC = () => {
  const [listData, setListData] = useState<DuanModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<DuanModel>(new DuanModel());

  useEffect(() => {
    getLstDuan();
  }, []);

  function getLstDuan() {
    DuanService.getInstance()
      .getLstDuan({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data;
          setListData(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function handleAdd() {
    setEditingModel(new DuanModel());
    setShowForm(true);
  }

  function handleEdit(duan: DuanModel) {
    // Format dates to YYYY-MM-DD for date inputs
    const formattedModel = {
      ...duan,
      ngayBatDau: duan.ngayBatDau
        ? dayjs(duan.ngayBatDau, "DD-MM-YYYY").format("YYYY-MM-DD")
        : duan.ngayBatDau,
      ngayKetThucDuKien: duan.ngayKetThucDuKien
        ? dayjs(duan.ngayKetThucDuKien, "DD-MM-YYYY").format("YYYY-MM-DD")
        : duan.ngayKetThucDuKien,
    };
    setEditingModel(formattedModel);
    setShowForm(true);
  }

  function handleDelete(maDa: string) {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      DuanService.getInstance()
        .deleteDuan(maDa)
        .then((resp) => {
          if (resp.status === 204) {
            toast.success("Xóa dự án thành công");
            getLstDuan();
          } else {
            toast.error("Có lỗi xảy ra khi xóa");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message || "Có lỗi xảy ra");
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    }
  }

  function closeModal(status: boolean) {
    setShowForm(false);
    getLstDuan();
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Danh sách Dự án</h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm dự án
            </button>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col" style={{ width: "5%" }}></th>
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Mã DA</th>
                  <th scope="col">Tên DA</th>
                  <th scope="col">Loại DA</th>
                  <th scope="col">Số NV Tối Đa</th>
                  <th scope="col">Mã Phòng QL</th>
                  <th scope="col">Mã NV Chủ Trì</th>
                  <th scope="col">Ngày Bắt Đầu</th>
                  <th scope="col">Ngày Kết Thúc Dự Kiến</th>
                  <th scope="col">Trạng Thái</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: DuanModel, index: number) => (
                  <tr key={item.maDa}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.maDa}</td>
                    <td>{item.tenDa}</td>
                    <td>{item.loaiDa}</td>
                    <td>{item.soNhanVienToiDa}</td>
                    <td>{item.maPhongQl}</td>
                    <td>{item.maNvChuTri}</td>
                    <td>
                      {item.ngayBatDau
                        ? dayjs(item.ngayBatDau).format("DD-MM-YYYY")
                        : ""}
                    </td>
                    <td>
                      {item.ngayKetThucDuKien
                        ? dayjs(item.ngayKetThucDuKien).format("DD-MM-YYYY")
                        : ""}
                    </td>
                    <td>{item.trangThai}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maDa!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel.maDa ? "Sửa dự án" : "Thêm dự án"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <DuanForm
                  model={editingModel}
                  closeModal={(status: boolean) => {
                    closeModal(status);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default DuanPage;
