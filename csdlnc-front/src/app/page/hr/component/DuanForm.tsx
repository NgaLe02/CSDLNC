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
import { ThamGiaDuanModel } from "../../../model/ThamGiaDuanModel";
import { ThamGiaDuanService } from "../../../services/ThamGiaDuanService";

export default function DuanForm(props: any) {
  // Convert dates from DD-MM-YYYY to YYYY-MM-DD for input type='date'
  const convertModelDates = (model: DuanModel) => {
    return {
      ...model,
      ngayBatDau: model.ngayBatDau
        ? dayjs(model.ngayBatDau, "DD-MM-YYYY").format("YYYY-MM-DD")
        : model.ngayBatDau,
      ngayKetThucDuKien: model.ngayKetThucDuKien
        ? dayjs(model.ngayKetThucDuKien, "DD-MM-YYYY").format("YYYY-MM-DD")
        : model.ngayKetThucDuKien,
      ngayKetThucThucTe: model.ngayKetThucThucTe
        ? dayjs(model.ngayKetThucThucTe, "DD-MM-YYYY").format("YYYY-MM-DD")
        : model.ngayKetThucThucTe,
    };
  };

  const [model, setModel] = useState<DuanModel>(
    props.model ? convertModelDates(props.model) : new DuanModel(),
  );
  const [listLoaiDuAn, setListLoaiDuAn] = useState<LoaiDuAnModel[]>([]);
  const [phongBanList, setPhongBanList] = useState<PhongBanModel[]>([]);
  const [nhanVienList, setNhanVienList] = useState<NhanVienModel[]>([]);
  const [thamGiaList, setThamGiaList] = useState<ThamGiaDuanModel[]>([]);
  const [soNvToiDa, setSoNvToiDa] = useState<number>(0);

  // Computed value for maNvChuTri from thamGiaList
  const maNvChuTri = thamGiaList.find((tg) => tg.vaiTro === "ChuTri")?.maNv;

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

  useEffect(() => {
    if (model.loaiDa) {
      const selectedLoai = listLoaiDuAn.find(
        (loai) => loai.maLoaiDuAn === model.loaiDa,
      );
      setSoNvToiDa(selectedLoai?.soNvToiDa || 0);
    }
  }, [model.loaiDa, listLoaiDuAn]);

  useEffect(() => {
    if (model.thamGiaLst && model.thamGiaLst.length > 0) {
      setThamGiaList(model.thamGiaLst);
    }
  }, [model.thamGiaLst]);

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

    if (name === "loaiDa") {
      const selectedLoai = listLoaiDuAn.find(
        (loai) => loai.maLoaiDuAn === value,
      );
      setSoNvToiDa(selectedLoai?.soNvToiDa || 0);
      // Reset thamGiaList khi đổi loại dự án
      setThamGiaList([]);
    }

    if (name === "maPhongQl") {
      // Load nhân viên của phòng này
      if (value) {
        NhanVienService.getInstance()
          .getLstNhanVienByPhong(value)
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              setNhanVienList(response.data);
              // Reset thamGiaList khi đổi phòng
              setThamGiaList([]);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch(() => {
            toast.error("Có lỗi xảy ra khi tải danh sách nhân viên");
          });
      } else {
        setNhanVienList([]);
        setThamGiaList([]);
      }
    }

    if (name === "maNvChuTri") {
      // Thêm trưởng dự án vào danh sách tham gia với vai trò ChuTri
      setThamGiaList((prev) => {
        // Remove existing ChuTri if any
        const filtered = prev.filter((tg) => tg.vaiTro !== "ChuTri");
        // Add new ChuTri
        const newChuTri = new ThamGiaDuanModel({
          maNv: value,
          vaiTro: "ChuTri",
        });
        return [...filtered, newChuTri];
      });
    }
  };

  const handleThamGiaChange = (maNv: string, checked: boolean) => {
    if (checked) {
      if (thamGiaList.length >= soNvToiDa - 1) {
        toast.warning(
          `Tối đa chỉ được chọn ${soNvToiDa - 1} nhân viên tham gia`,
        );
        return;
      }
      if (
        thamGiaList.some((tg) => tg.maNv === maNv && tg.vaiTro === "ChuTri")
      ) {
        toast.warning("Trưởng dự án không thể tham gia với vai trò thành viên");
        return;
      }
      const newThamGia = new ThamGiaDuanModel({
        maNv: maNv,
        vaiTro: "ThanhVien",
      });
      setThamGiaList((prev) => [...prev, newThamGia]);
    } else {
      setThamGiaList((prev) => prev.filter((tg) => tg.maNv !== maNv));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(thamGiaList);
    e.preventDefault();
    // Format dates to DD-MM-YYYY before sending
    const formattedModel = {
      ...model,
      thamGiaLst: thamGiaList,
      //   ngayBatDau: model.ngayBatDau
      //     ? dayjs(model.ngayBatDau).format("DD-MM-YYYY")
      //     : model.ngayBatDau,
      //   ngayKetThucDuKien: model.ngayKetThucDuKien
      //     ? dayjs(model.ngayKetThucDuKien).format("DD-MM-YYYY")
      //     : model.ngayKetThucDuKien,
      //   ngayKetThucThucTe: model.ngayKetThucThucTe
      //     ? dayjs(model.ngayKetThucThucTe).format("DD-MM-YYYY")
      //     : model.ngayKetThucThucTe,
    };
    console.log(formattedModel);

    if (model.maDa) {
      DuanService.getInstance()
        .updateDuan(formattedModel)
        .then(async (resp) => {
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
        .then(async (resp) => {
          if (resp.status === 201) {
            const maDa = resp.data.maDa; // Assume response has maDa
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
      <div
        className="bg-light rounded p-4"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
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
          {soNvToiDa > 1 && (
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">
                  Nhân Viên Tham Gia (Tối đa {soNvToiDa - 1} người)
                </label>
                <div
                  className="border p-3"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {nhanVienList
                    .filter((nv) => nv.maNv !== maNvChuTri)
                    .map((nv) => (
                      <div key={nv.maNv} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`thamgia-${nv.maNv}`}
                          checked={thamGiaList.some(
                            (tg) => tg.maNv === nv.maNv,
                          )}
                          onChange={(e) =>
                            handleThamGiaChange(nv.maNv!, e.target.checked)
                          }
                          disabled={
                            thamGiaList.length >= soNvToiDa - 1 &&
                            !thamGiaList.some((tg) => tg.maNv === nv.maNv)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`thamgia-${nv.maNv}`}
                        >
                          {nv.hoTen}
                        </label>
                      </div>
                    ))}
                </div>
                <small className="text-muted">
                  Đã chọn: {thamGiaList.length} / {soNvToiDa - 1}
                </small>
              </div>
            </div>
          )}
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

          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
