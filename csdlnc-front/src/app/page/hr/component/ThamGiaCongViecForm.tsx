import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";
import { NhanVienService } from "../../../services/NhanVienService";
import { HttpStatusCode } from "axios";
import { NhanVienModel } from "../../../model/NhanVienModel";
import { ThucHienCongViecModel } from "../../../model/ThucHienCongViecModel";
import { CongViecService } from "../../../services/CongViecService";
import { ThucHienCongViecService } from "../../../services/ThucHienCongViecService";

export default function ThamGiaCongViecForm(props: any) {
  const [model, setModel] = useState<ThucHienCongViecModel>(
    props.model ?? new ThucHienCongViecModel(),
  );
  const [nhanVienChuaThamList, setNhanVienChuaThamGiaList] = useState<
    NhanVienModel[]
  >([]);
  const [selectedMaNv, setSelectedMaNv] = useState<string[]>([]);

  const loadNhanVienChuaThamGiaCongViec = (maCv: string) => {
    CongViecService.getInstance()
      .getNhanVienChuaThamGiaCongViec(maCv)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setNhanVienChuaThamGiaList(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (model.maCv) {
      loadNhanVienChuaThamGiaCongViec(model.maCv);
    }
  }, [model.maCv]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedMaNv(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (model.maCv) {
      ThucHienCongViecService.getInstance()
        .insertListNvThucHienCongViec({
          maCongViec: model.maCv!,
          lstNhanVien: selectedMaNv,
        })
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm tham gia công việc thành công");
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
            <label htmlFor="maNv" className="form-label">
              Nhân Viên
            </label>
            <select
              multiple
              className="form-control"
              id="maNv"
              name="maNv"
              value={selectedMaNv}
              onChange={handleSelectChange}
              required
            >
              {nhanVienChuaThamList.map((nv) => (
                <option key={nv.maNhanVien} value={nv.maNhanVien}>
                  {nv.hoTen} ({nv.maNhanVien})
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
