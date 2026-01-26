import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { ThucHienCongDoanModel } from "../../../model/ThucHienCongDoanModel";
import { ThucHienCongDoanService } from "../../../services/ThucHienCongDoanService";
import { HttpStatusCode } from "axios";
import { NhanVienService } from "../../../services/NhanVienService";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { CongDoanService } from "../../../services/CongDoanService";
import { DuanService } from "../../../services/DuanService";
import { CongDoanModel } from "../../../model/CongDoanModel";

export default function ThucHienCongDoanForm(props: any) {
  const [model, setModel] = useState<ThucHienCongDoanModel>(
    props.thucHienCongDoan ?? new ThucHienCongDoanModel(),
  );
  const [congDoan, setCongDoan] = useState<CongDoanModel>(
    props.congDoan ?? new CongDoanModel(),
  );
  const [maDa, setMaDa] = useState<string>(props.maDa ?? "");
  const [nhanVienList, setNhanVienList] = useState<NhanVienModel[]>([]);
  const [selectedThang, setSelectedThang] = useState<number>(1);
  const [selectedNam, setSelectedNam] = useState<number>(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const loadCongDoan = useCallback(async () => {
    if (model.maCd) {
      try {
        const congDoanResp = await CongDoanService.getInstance().getCongDoanById(model.maCd);
        if (congDoanResp.status === HttpStatusCode.Ok) {
          setCongDoan(congDoanResp.data);
          setMaDa(congDoanResp.data.maDa);
          
          // Parse ngayBatDau để set tháng/năm mặc định
          if (congDoanResp.data.ngayBatDau) {
            const ngayBatDau = new Date(congDoanResp.data.ngayBatDau);
            setSelectedThang(ngayBatDau.getMonth() + 1);
            setSelectedNam(ngayBatDau.getFullYear());
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải công đoạn:", error);
      }
    }
  }, [model.maCd]);

  useEffect(() => {
    loadCongDoan();
  }, [loadCongDoan]);

  const getLstNhanVien = useCallback(async () => {
    if (maDa) {
      try {
        // Lấy danh sách nhân viên tham gia dự án trong tháng/năm được chọn
        const thamGiaResp =
          await DuanService.getInstance().getLstNhanVienThamGiaDuan({
            maDa: maDa,
            thang: selectedThang.toString(),
            nam: selectedNam.toString(),
          });
        if (thamGiaResp.status === HttpStatusCode.Ok) {
          setNhanVienList(thamGiaResp.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhân viên:", error);
      }
    }
  }, [maDa, selectedThang, selectedNam]);

  useEffect(() => {
    if (model.maCd) {
      getLstNhanVien();
    }
  }, [model.maCd, getLstNhanVien]);

  useEffect(() => {
    if (maDa) {
      getLstNhanVien();
    }
  }, [selectedThang, selectedNam, getLstNhanVien]);

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
    // Cập nhật thang và nam vào model
    const updatedModel = {
      ...model,
      thang: selectedThang,
      nam: selectedNam,
    };
    
    if (props.type === "U") {
      ThucHienCongDoanService.getInstance()
        .updateThucHienCongDoan(updatedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật thành công");
            props.onClose(true);
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
      ThucHienCongDoanService.getInstance()
        .insertThucHienCongDoan(updatedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm thành công");
            props.onClose(true);
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
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.type === "U"
                ? "Cập nhật người thực hiện"
                : "Thêm người thực hiện"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => props.onClose(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="bg-light rounded p-4"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="maNv" className="form-label">
                    Nhân viên
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
                  <label htmlFor="maCd" className="form-label">
                    Mã CD
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="maCd"
                    name="maCd"
                    value={model.maCd ?? ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="thang" className="form-label">
                    Tháng thực hiện
                  </label>
                  <select
                    className="form-control"
                    id="thang"
                    value={selectedThang}
                    onChange={(e) => setSelectedThang(Number(e.target.value))}
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
                    Năm thực hiện
                  </label>
                  <select
                    className="form-control"
                    id="nam"
                    value={selectedNam}
                    onChange={(e) => setSelectedNam(Number(e.target.value))}
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
        </div>
      </div>
    </div>
  );
}
