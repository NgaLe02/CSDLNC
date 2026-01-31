import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { NhanVienService } from "../../../services/NhanVienService";
import { PhongBanService } from "../../../services/PhongBanService";
import { HttpStatusCode } from "axios";
import { PhongBanModel } from "../../../model/PhongBanModel";
import { BacLuongModel } from "../../../model/BacLuongModel";
import { BacLuongService } from "../../../services/BacLuongService";

export default function NhanVienForm(props: any) {
  const [model, setModel] = useState<NhanVienModel>(
    props.model ?? new NhanVienModel(),
  );

  const [phongBanList, setPhongBanList] = useState<PhongBanModel[]>([]);
  const [listBacLuong, setListBacLuong] = useState<BacLuongModel[]>([]);

  useEffect(() => {
    getLstBacLuong();
    getLstPhongBan();
  }, []);

  const getLstBacLuong = async () => {
    BacLuongService.getInstance()
      .getLstBacLuong()
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListBacLuong(resp.data);
        }
      });
  };

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

  const handleNhanVienChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChucVuChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      phanCong: {
        ...prev.phanCong,
        [name]: value,
      },
    }));
  };

  const handleBacLuongChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      xepBacLuong: {
        ...prev.xepBacLuong,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedModel = {
      ...model,

      ngaySinh: model.ngaySinh
        ? dayjs(model.ngaySinh).format("YYYY-MM-DD")
        : undefined,

      phanCong: model.phanCong
        ? {
            ...model.phanCong,
            ngayApDung: model.phanCong.ngayApDung
              ? dayjs(model.phanCong.ngayApDung).format("YYYY-MM-DD")
              : undefined,
          }
        : undefined,

      xepBacLuong: model.xepBacLuong
        ? {
            ...model.xepBacLuong,
            ngayApDung: model.xepBacLuong.ngayApDung
              ? dayjs(model.xepBacLuong.ngayApDung).format("YYYY-MM-DD")
              : undefined,
          }
        : undefined,
    };

    if (model.maNhanVien) {
      NhanVienService.getInstance()
        .updateNhanVien(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật nhân viên thành công");
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
      NhanVienService.getInstance()
        .insertNhanVien(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm nhân viên thành công");
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
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          <h5>Thông tin cá nhân</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maNhanVien" className="form-label">
                Mã NV
              </label>
              <input
                type="text"
                className="form-control"
                id="maNhanVien"
                name="maNhanVien"
                value={model.maNhanVien ?? ""}
                onChange={handleNhanVienChange}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Giới Tính</label>
              <select
                className="form-control"
                name="gioiTinh"
                value={model.gioiTinh ?? ""}
                onChange={handleNhanVienChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Họ Tên</label>
              <input
                type="text"
                className="form-control"
                name="hoTen"
                value={model.hoTen ?? ""}
                onChange={handleNhanVienChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Ngày Sinh</label>
              <input
                type="date"
                className="form-control"
                name="ngaySinh"
                value={model.ngaySinh ?? ""}
                onChange={handleNhanVienChange}
              />
            </div>
          </div>

          <h5>Phân công phòng</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phòng Ban</label>
              <select
                className="form-control"
                name="maPhongBan"
                value={model?.phanCong?.maPhongBan ?? ""}
                onChange={handleChucVuChange}
                required
              >
                <option value="">Chọn phòng ban</option>
                {phongBanList.map((pb) => (
                  <option key={pb.maPhongBan} value={pb.maPhongBan}>
                    {pb.maPhongBan} - {pb.tenPhongBan}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Chức Vụ</label>
              <select
                className="form-control"
                name="tenChucVu"
                value={model?.phanCong?.tenChucVu ?? ""}
                onChange={handleChucVuChange}
                required
              >
                <option value="">Chọn chức vụ</option>
                <option value="NhanVien">Nhân Viên</option>
                <option value="TruongPhong">Trưởng Phòng</option>
                <option value="PhoPhong">Phó Phòng</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Ngày áp dụng</label>
              <input
                type="date"
                className="form-control"
                name="ngayApDung"
                value={model?.phanCong?.ngayApDung ?? ""}
                onChange={handleChucVuChange}
              />
            </div>
          </div>

          <h5>Lương</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Bậc lương</label>
              <select
                className="form-control"
                name="maBacLuong"
                value={model.xepBacLuong?.maBacLuong ?? ""}
                onChange={handleBacLuongChange}
              >
                <option value="">Chọn bậc lương</option>
                {listBacLuong.map((pb) => (
                  <option key={pb.maBacLuong} value={pb.maBacLuong}>
                    {pb.tenBacLuong} - {pb.mucLuongCoBan} VNĐ
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Ngày áp dụng</label>
              <input
                type="date"
                className="form-control"
                name="ngayApDung"
                value={model?.xepBacLuong?.ngayApDung ?? ""}
                onChange={handleBacLuongChange}
              />
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
