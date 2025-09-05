import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RouteService } from "../../../../services/RouteService";
import { RouteModel } from "../../../../model/RouteModel";
import { RouteSalaryService } from "../../../../services/RouteSalaryService";
import { HttpStatusCode } from "axios";

export default function RouteForm(props: any) {
  const [model, setModel] = useState<RouteModel>(
    props.model ?? new RouteModel()
  );
  const [thuLaoPhuXe, setThuLaoPhuXe] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function check() {
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!check()) {
      return;
    }
    if (model.maTuyen) {
      RouteService.getInstance()
        .updateRoute(model)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            props.closeModal(true);
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    } else {
      RouteService.getInstance()
        .insertRoute(model)
        .then((resp) => {
          if (resp.data.status) {
            toast.success(resp.data.message);
            props.closeModal(true);
          } else {
            toast.error(resp.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Có lỗi xảy ra");
          }
        });
    }
  };

  function findRouteSalayByDoPhucTapAndKc(doPhucTap: number, khoangCach: number) {
    RouteSalaryService.getInstance()
      .findRouteSalayByDoPhucTapAndKc(doPhucTap, khoangCach)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData;
            setModel((prev) => ({
              ...prev,
              maLuongTuyen: data.maLuongTuyen,
            }));
            setThuLaoPhuXe(data.luongCoBan);
          } else {
            setThuLaoPhuXe(0);
            toast.error(response.data.message);
          }
        } else {
          setThuLaoPhuXe(0);
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }


  useEffect(() => {
    if (model.doPhucTap && model.khoangCach) {
      findRouteSalayByDoPhucTapAndKc(model.doPhucTap, model.khoangCach);
    }
  }, [model.doPhucTap, model.khoangCach])

  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-light rounded h-100 p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="diemKhoiHanh" className="form-label">
                Điểm khởi hành
              </label>
              <input
                type="text"
                className="form-control"
                id="diemKhoiHanh"
                name="diemKhoiHanh"
                value={model.diemKhoiHanh ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="diemDen" className="form-label">
                Điểm đến
              </label>
              <input
                type="text"
                className="form-control"
                id="diemDen"
                name="diemDen"
                disabled={model.maTuyen ? true : false}
                value={model.diemDen ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">

            <div className="col-md-6">
              <label htmlFor="khoangCach" className="form-label">
                Khoảng cách (km)
              </label>
              <input
                type="number"
                className="form-control"
                id="khoangCach"
                disabled={model.maTuyen ? true : false}
                name="khoangCach"
                value={model.khoangCach ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="thoiGianUocTinh" className="form-label">
                Thòi gian ước tính (phút)
              </label>
              <input
                type="number"
                className="form-control"
                id="thoiGianUocTinh"
                name="thoiGianUocTinh"
                value={model.thoiGianUocTinh ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">

            <div className="col-md-6">
              <label htmlFor="doPhucTap" className="form-label">
                Độ phức tạp
              </label>
              <input
                type="number"
                className="form-control"
                id="doPhucTap"
                name="doPhucTap"
                disabled={model.maTuyen ? true : false}
                value={model.doPhucTap ?? ""}
                step="1"
                onKeyDown={(e) => {
                  if (e.key === "." || e.key === ",") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="heSoDuongKho" className="form-label">
                Hệ số đường khó
              </label>
              <input
                type="number"
                className="form-control"
                id="heSoDuongKho"
                name="heSoDuongKho"
                disabled={model.maTuyen ? true : false}
                value={model.heSoDuongKho ?? ""}
                step="1"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="tinhTrangChuyen" className="form-label">
              Thù lao phụ xe:{" "}
              {thuLaoPhuXe ? thuLaoPhuXe?.toLocaleString("vi-vn") : "0"} VNĐ
            </label>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => props.closeModal()}
          >
            Huỷ
          </button>

          <button type="submit" className="btn btn-primary ms-2">
            {model.maTuyen ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>
    </div>
  );
}
