import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DuanModel } from "../../../model/DuanModel";
import { DuanService } from "../../../services/DuanService";
import { LoaiDuAnModel } from "../../../model/LoaiDuAnModel";
import { LoaiDuAnService } from "../../../services/LoaiDuAnService";
import { PhongBanService } from "../../../services/PhongBanService";
import { NhanVienService } from "../../../services/NhanVienService";
import { HttpStatusCode } from "axios";
import { PhongBanModel } from "../../../model/PhongBanModel";
import { NhanVienModel } from "../../../model/NhanVienModel";

export default function DuanForm(props: any) {
  const [model, setModel] = useState<DuanModel>(props.model ?? new DuanModel());
  const [listLoaiDuAn, setListLoaiDuAn] = useState<LoaiDuAnModel[]>([]);
  const [phongBanList, setPhongBanList] = useState<PhongBanModel[]>([]);
  const [nhanVienList, setNhanVienList] = useState<NhanVienModel[]>([]);

  useEffect(() => {
    getLstLoaiDuAn();
    getLstPhongBan();
  }, []);

  useEffect(() => {
    if (model.maPhongQl) {
      getLstNhanVienByPhong(model.maPhongQl);
    } else {
      setNhanVienList([]);
    }
  }, [model.maPhongQl]);

  function getLstNhanVienByPhong(maPhong: string) {
    NhanVienService.getInstance()
      .getLstNhanVienByPhong(maPhong)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setNhanVienList(response.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra khi tải danh sách nhân viên");
      });
  }

  function getLstPhongBan() {
    PhongBanService.getInstance()
      .getLstPhongBan({})
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data;
          setPhongBanList(data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  useEffect(() => {
    getLstLoaiDuAn();
  }, []);

  const getLstLoaiDuAn = async () => {
    LoaiDuAnService.getInstance()
      .getLstLoaiDuAn({})
      .then((resp) => {
        if (resp.status === 200) {
          setListLoaiDuAn(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "maPhongQl") {
      // Load nhân viên của phòng này
      if (value) {
        NhanVienService.getInstance()
          .getLstNhanVienByPhong(value)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              setNhanVienList(response.data);
              // Reset maNvChuTri khi đổi phòng
              setModel((prev) => ({
                ...prev,
                maNvChuTri: "",
              }));
            } else {
              toast.error(response.data.message);
            }
          })
          .catch(() => {
            toast.error("Có lỗi xảy ra khi tải danh sách nhân viên");
          });
      } else {
        setNhanVienList([]);
        setModel((prev) => ({
          ...prev,
          maNvChuTri: "",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Format dates to DD-MM-YYYY before sending
    const formattedModel = {
      ...model,
      ngayBatDau: model.ngayBatDau
        ? dayjs(model.ngayBatDau).format("DD-MM-YYYY")
        : model.ngayBatDau,
      ngayKetThucDuKien: model.ngayKetThucDuKien
        ? dayjs(model.ngayKetThucDuKien).format("DD-MM-YYYY")
        : model.ngayKetThucDuKien,
      ngayKetThucThucTe: model.ngayKetThucThucTe
        ? dayjs(model.ngayKetThucThucTe).format("DD-MM-YYYY")
        : model.ngayKetThucThucTe,
    };
    if (model.maDa) {
      DuanService.getInstance()
        .updateDuan(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật dự án thành công");
            props.closeModal(true);
          } else {
            toast.error("Có lỗi xảy ra khi cập nhật");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message || "Có lỗi xảy ra");
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    } else {
      DuanService.getInstance()
        .insertDuan(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm dự án thành công");
            props.closeModal(true);
          } else {
            toast.error("Có lỗi xảy ra khi thêm");
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
  };

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maDa" className="form-label">
                Mã DA
              </label>
              <input
                type="text"
                className="form-control"
                id="maDa"
                name="maDa"
                value={model.maDa ?? ""}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="loaiDa" className="form-label">
                Loại DA
              </label>
              <select
                className="form-control"
                id="loaiDa"
                name="loaiDa"
                value={model.loaiDa ?? ""}
                onChange={handleSelectChange}
                required
              >
                <option value="">Chọn loại dự án</option>
                {listLoaiDuAn.map((loai) => (
                  <option key={loai.maLoaiDuAn} value={loai.maLoaiDuAn}>
                    {loai.tenLoaiDuAn} - Tối đa {loai.soNvToiDa} nhân viên
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="tenDa" className="form-label">
                Tên DA
              </label>
              <input
                type="text"
                className="form-control"
                id="tenDa"
                name="tenDa"
                value={model.tenDa ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maPhongQl" className="form-label">
                Phòng quản lý
              </label>
              <select
                className="form-control"
                name="maPhongQl"
                value={model.maPhongQl ?? ""}
                onChange={handleSelectChange}
                required
              >
                <option value="">Chọn phòng ban</option>
                {phongBanList.map((pb) => (
                  <option key={pb.maPhong} value={pb.maPhong}>
                    {pb.maPhong} - {pb.tenPhong}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="maNvChuTri" className="form-label">
                Nhân viên chủ trì
              </label>
              <select
                className="form-control"
                name="maNvChuTri"
                value={model.maNvChuTri ?? ""}
                onChange={handleSelectChange}
                required
              >
                <option value="">Chọn nhân viên</option>
                {nhanVienList.map((pb) => (
                  <option key={pb.maNv} value={pb.maNv}>
                    {pb.hoTen}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="ngayBatDau" className="form-label">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                className="form-control"
                id="ngayBatDau"
                name="ngayBatDau"
                value={model.ngayBatDau ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="ngayKetThucDuKien" className="form-label">
                Ngày Kết Thúc Dự Kiến
              </label>
              <input
                type="date"
                className="form-control"
                id="ngayKetThucDuKien"
                name="ngayKetThucDuKien"
                value={model.ngayKetThucDuKien ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="ketQuaThucHien" className="form-label">
              Kết Quả Thực Hiện
            </label>
            <textarea
              className="form-control"
              id="ketQuaThucHien"
              name="ketQuaThucHien"
              value={model.ketQuaThucHien ?? ""}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="trangThai" className="form-label">
                Trạng Thái
              </label>
              <select
                className="form-control"
                id="trangThai"
                name="trangThai"
                value={model.trangThai ?? ""}
                onChange={handleSelectChange}
              >
                <option value="">Chọn trạng thái</option>
                <option value="ChuaThucHien">Chưa thực hiện</option>
                <option value="DangThucHien">Đang thực hiện</option>
                <option value="DungHan">Đúng hạn</option>
                <option value="QuaHan">Quá hạn</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
