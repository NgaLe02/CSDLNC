import React, { useState, useEffect } from "react";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DuanModel } from "../../model/DuanModel";
import { DuanService } from "../../services/DuanService";
import { LoaiDuAnModel } from "../../model/LoaiDuAnModel";
import { LoaiDuAnService } from "../../services/LoaiDuAnService";
import DuanForm from "./component/DuanForm";
import ThamGiaDuanList from "./component/ThamGiaDuanList";
import CongDoanList from "./component/CongDoanList";

const DuanPage: React.FC = () => {
  const [listData, setListData] = useState<DuanModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<DuanModel>(new DuanModel());
  const [listLoaiDuAn, setListLoaiDuAn] = useState<LoaiDuAnModel[]>([]);
  const [showThamGiaModal, setShowThamGiaModal] = useState(false);
  const [selectedMaDa, setSelectedMaDa] = useState<string>("");
  const [selectedTrangThai, setSelectedTrangThai] = useState<string>("");
  const [showCongDoanModal, setShowCongDoanModal] = useState(false);

  useEffect(() => {
    getLstDuan();
    getLstLoaiDuAn();
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

  function getLstLoaiDuAn() {
    LoaiDuAnService.getInstance()
      .getLstLoaiDuAn({})
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListLoaiDuAn(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
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
        ? dayjs(duan.ngayBatDau).format("YYYY-MM-DD")
        : duan.ngayBatDau,
      ngayKetThucDuKien: duan.ngayKetThucDuKien
        ? dayjs(duan.ngayKetThucDuKien).format("YYYY-MM-DD")
        : duan.ngayKetThucDuKien,
      ngayKetThucThucTe: duan.ngayKetThucThucTe
        ? dayjs(duan.ngayKetThucThucTe).format("YYYY-MM-DD")
        : duan.ngayKetThucThucTe,
    };
    setEditingModel(formattedModel);
    setShowForm(true);
  }

  function handleThamGia(maDa: string) {
    const duan = listData.find((d) => d.maDa === maDa);
    setSelectedMaDa(maDa);
    setSelectedTrangThai(duan?.trangThai || "");
    setShowThamGiaModal(true);
  }
  function handleCongDoan(maDa: string) {
    setSelectedMaDa(maDa);
    setShowCongDoanModal(true);
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
                  <th scope="col">Ngày Kết Thúc Thực Tế</th>
                  <th scope="col">Kết Quả Thực Hiện</th>
                  <th scope="col">Trạng Thái</th>
                  <th scope="col">Thành viên</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: DuanModel, index: number) => (
                  <tr key={item.maDa}>
                    <td>{index + 1}</td>
                    <td>{item.maDa}</td>
                    <td>{item.tenDa}</td>
                    <td>
                      {listLoaiDuAn.find((l) => l.maLoaiDuAn === item.loaiDa)
                        ?.tenLoaiDuAn || item.loaiDa}
                    </td>
                    <td>{item?.loaiDuAn?.soNvToiDa}</td>
                    <td>{item.maPhongQl}</td>
                    <td>
                      {
                        item.thamGiaLst?.find((tg) => tg.vaiTro === "ChuTri")
                          ?.maNv
                      }
                    </td>
                    <td>{item.ngayBatDau ? item.ngayBatDau : ""}</td>
                    <td>
                      {item.ngayKetThucDuKien ? item.ngayKetThucDuKien : ""}
                    </td>
                    <td>
                      {item.ngayKetThucThucTe ? item.ngayKetThucThucTe : ""}
                    </td>
                    <td>{item.ketQuaThucHien}</td>
                    <td>{item.trangThai}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleThamGia(item.maDa!)}
                      >
                        Thành viên
                      </button>
                      <button
                        className="btn btn-sm btn-primary ms-2"
                        onClick={() => handleCongDoan(item.maDa!)}
                      >
                        Công đoạn
                      </button>
                    </td>
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

      {showThamGiaModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <ThamGiaDuanList
                  maDa={selectedMaDa}
                  trangThai={selectedTrangThai}
                  onClose={() => setShowThamGiaModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showCongDoanModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <CongDoanList
                  maDa={selectedMaDa}
                  onClose={() => setShowCongDoanModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && <div className="modal-backdrop fade show"></div>}
      {showThamGiaModal && <div className="modal-backdrop fade show"></div>}
      {showCongDoanModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default DuanPage;
