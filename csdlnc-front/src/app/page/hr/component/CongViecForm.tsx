import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CongViecModel } from "../../../model/CongViecModel";
import { CongViecService } from "../../../services/CongViecService";
import { LoaiCongViecModel } from "../../../model/LoaiCongViecModel";
import { LoaiCongViecService } from "../../../services/LoaiCongViecService";
import { HttpStatusCode } from "axios";
import dayjs from "dayjs";

export default function CongViecForm(props: any) {
  const [model, setModel] = useState<CongViecModel>(
    props.model ?? new CongViecModel(),
  );
  const [listLoaiCv, setListLoaiCv] = useState<LoaiCongViecModel[]>([]);
  useEffect(() => {
    setModel(props.model);
  }, [props.model]);

  useEffect(() => {
    getLstLoaiCV();
  }, []);

  const getLstLoaiCV = async () => {
    LoaiCongViecService.getInstance()
      .getLstLoaiCv({})
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          setListLoaiCv(resp.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedModel = {
      ...model,

      ngayBatDau: model.ngayBatDau
        ? dayjs(model.ngayBatDau).format("YYYY-MM-DD")
        : undefined,
      ngayHoanThanhDuKien: model.ngayHoanThanhDuKien
        ? dayjs(model.ngayHoanThanhDuKien).format("YYYY-MM-DD")
        : undefined,
      ngayHoanThanhThucTe: model.ngayHoanThanhThucTe
        ? dayjs(model.ngayHoanThanhThucTe).format("YYYY-MM-DD")
        : undefined,
    };
    if (model.maCongViec) {
      CongViecService.getInstance()
        .updateCongViec(formattedModel)
        .then((resp) => {
          if (resp.status === 200) {
            toast.success("Cập nhật công việc thành công");
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
      CongViecService.getInstance()
        .insertCongViec(formattedModel)
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Thêm công việc thành công");
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
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="maCongViec" className="form-label">
                Mã CV
              </label>
              <input
                type="text"
                className="form-control"
                id="maCongViec"
                name="maCongViec"
                value={model?.maCongViec ?? ""}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="maLoaiCv" className="form-label">
                Loại Công Việc
              </label>
              <select
                className="form-control"
                id="maLoaiCv"
                name="maLoaiCv"
                value={model?.maLoaiCv ?? ""}
                onChange={handleChange}
              >
                <option value="">Chọn loại công việc</option>
                {listLoaiCv.map((pb) => (
                  <option key={pb.maLoaiCv} value={pb.maLoaiCv}>
                    {pb.tenLoaiCongViec} - {pb.mucLuongNangSuat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="tenCongViec" className="form-label">
                Tên Công Việc
              </label>
              <input
                type="text"
                className="form-control"
                id="tenCongViec"
                name="tenCongViec"
                value={model?.tenCongViec ?? ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="ngayBatDau" className="form-label">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                className="form-control"
                id="ngayBatDau"
                name="ngayBatDau"
                value={model?.ngayBatDau ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label htmlFor="ngayBatDau" className="form-label">
                Ngày kết thúc dự kiến
              </label>
              <input
                type="date"
                className="form-control"
                id="ngayHoanThanhDuKien"
                name="ngayHoanThanhDuKien"
                value={model?.ngayHoanThanhDuKien ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Kết quả</label>
              <select
                className="form-control"
                name="ketQua"
                value={model?.ketQua ?? ""}
                onChange={handleChange}
              >
                <option value="">Chọn kết quả</option>
                <option value="KEM">Kém</option>
                <option value="TOT">Tốt</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Trạng thái tiến độ</label>
              <select
                className="form-control"
                name="trangThaiTienDo"
                value={model?.trangThaiTienDo ?? ""}
                onChange={handleChange}
                required
              >
                <option value="">Chọn trạng thái tiến độ</option>
                <option value="ChuaThucHien">Chưa thực hiện</option>
                <option value="DangThucHien">Đang thực hiện</option>
                <option value="DaThucHien">Đã thực hiện</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="ngayBatDau" className="form-label">
                Ngày kết thúc thực tế
              </label>
              <input
                type="date"
                className="form-control"
                id="ngayHoanThanhDuKien"
                name="ngayHoanThanhDuKien"
                value={model?.ngayHoanThanhThucTe ?? ""}
                onChange={handleChange}
                readOnly
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
