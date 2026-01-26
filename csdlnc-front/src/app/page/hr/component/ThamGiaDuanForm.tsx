import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { ThamGiaDuanModel } from "../../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";
import { NhanVienService } from "../../../services/NhanVienService";
import { DuanService } from "../../../services/DuanService";
import { HttpStatusCode } from "axios";
import { NhanVienModel } from "../../../model/NhanVienModel";

export default function ThamGiaDuanForm(props: any) {
  const [model, setModel] = useState<ThamGiaDuanModel>(
    props.model ?? new ThamGiaDuanModel(),
  );
  const [nhanVienList, setNhanVienList] = useState<NhanVienModel[]>([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const loadNhanVienByDuAn = useCallback(async () => {
    try {
      // Get project to find maPhongQl
      const duanResp = await DuanService.getInstance().getDuanById(model.maDa!);
      if (duanResp.status === HttpStatusCode.Ok && duanResp.data.maPhongQl) {
        // Get employees by department
        const nvResp =
          await NhanVienService.getInstance().getLstNhanVienByPhong(
            duanResp.data.maPhongQl,
          );
        if (nvResp.status === HttpStatusCode.Ok) {
          setNhanVienList(nvResp.data);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
    }
  }, [model.maDa]);

  useEffect(() => {
    if (model.maDa) {
      loadNhanVienByDuAn();
    }
  }, [model.maDa, loadNhanVienByDuAn]);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.type === "U") {
      ThamGiaDuanService.getInstance()
        .updateThamGiaDuan(model)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật tham gia dự án thành công");
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
      ThamGiaDuanService.getInstance()
        .insertThamGiaDuan(model)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm tham gia dự án thành công");
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
          <div className="mb-3">
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

          <div className="mb-3">
            <label htmlFor="maNv" className="form-label">
              Nhân Viên
            </label>
            <select
              className="form-control"
              id="maNv"
              name="maNv"
              value={model.maNv ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn nhân viên</option>
              {nhanVienList.map((nv) => (
                <option key={nv.maNv} value={nv.maNv}>
                  {nv.hoTen} ({nv.maNv})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="vaiTro" className="form-label">
              Vai Trò
            </label>
            <select
              className="form-control"
              id="vaiTro"
              name="vaiTro"
              value={model.vaiTro ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="ThanhVien">Thành viên</option>
              <option value="ChuTri">Chủ trì</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="thang" className="form-label">
              Tháng
            </label>
            <select
              className="form-control"
              id="thang"
              name="thang"
              value={model.thang ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn tháng</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="nam" className="form-label">
              Năm
            </label>
            <select
              className="form-control"
              id="nam"
              name="nam"
              value={model.nam ?? ""}
              onChange={handleSelectChange}
              required
            >
              <option value="">Chọn năm</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
