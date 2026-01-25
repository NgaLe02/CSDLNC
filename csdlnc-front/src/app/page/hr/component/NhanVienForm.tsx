import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { NhanVienService } from "../../../services/NhanVienService";
import { PhongBanService } from "../../../services/PhongBanService";
import { HttpStatusCode } from "axios";

export default function NhanVienForm(props: any) {
  const [model, setModel] = useState<NhanVienModel>(
    props.model ?? new NhanVienModel(),
  );

  const [phongBanList, setPhongBanList] = useState<any[]>([]);

  useEffect(() => {
    getLstPhongBan();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Format ngaySinh to DD-MM-YYYY before sending
    const formattedModel = {
      ...model,
      ngaySinh: model.ngaySinh
        ? dayjs(model.ngaySinh).format("DD-MM-YYYY")
        : model.ngaySinh,
    };
    if (model.maNv) {
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
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maNv" className="form-label">
                Mã NV
              </label>
              <input
                type="text"
                className="form-control"
                id="maNv"
                name="maNv"
                value={model.maNv ?? ""}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phòng Ban</label>
              <select
                className="form-control"
                name="maPhong"
                value={model.maPhong ?? ""}
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
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Họ Tên</label>
              <input
                type="text"
                className="form-control"
                name="hoTen"
                value={model.hoTen ?? ""}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Chức Vụ</label>
              <select
                className="form-control"
                name="chucVu"
                value={model.chucVu ?? ""}
                onChange={handleSelectChange}
                required
              >
                <option value="">Chọn chức vụ</option>
                <option value="NhanVien">Nhân Viên</option>
                <option value="TruongPhong">Trưởng Phòng</option>
                <option value="PhoPhong">Phó Phòng</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Giới Tính</label>
              <select
                className="form-control"
                name="gioiTinh"
                value={model.gioiTinh ?? ""}
                onChange={handleSelectChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Bậc Lương</label>
              <input
                type="number"
                className="form-control"
                name="bacLuong"
                value={model.bacLuong ?? ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Lương Cơ Bản</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="luongCoBan"
                value={model.luongCoBan ?? ""}
                onChange={handleChange}
                required
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
