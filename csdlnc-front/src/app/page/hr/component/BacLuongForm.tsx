import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BacLuongModel } from "../../../model/BacLuongModel";
import { BacLuongService } from "../../../services/BacLuongService";

export default function BacLuongForm(props: any) {
  const [model, setModel] = useState<BacLuongModel>(
    props.model ?? new BacLuongModel(),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const service = BacLuongService.getInstance();

    // Nếu có props.model (tức là đang sửa) hoặc dựa vào logic mã đã tồn tại
    const action = props.isEdit
      ? service.updateBacLuong(model)
      : service.insertBacLuong(model);

    action
      .then((resp) => {
        if (resp.status === 200 || resp.status === 201) {
          toast.success(
            `${props.isEdit ? "Cập nhật" : "Thêm"} bậc lương thành công`,
          );
          props.closeModal(true);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Có lỗi xảy ra");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Mã Bậc Lương</label>
        <input
          type="text"
          className="form-control"
          name="maBacLuong"
          value={model.maBacLuong ?? ""}
          onChange={handleChange}
          required
          readOnly={true}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tên Bậc Lương</label>
        <input
          type="text"
          className="form-control"
          name="tenBacLuong"
          value={model.tenBacLuong ?? ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mức Lương Cơ Bản</label>
        <input
          type="number"
          className="form-control"
          name="mucLuongCoBan"
          value={model.mucLuongCoBan ?? ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Lưu
      </button>
    </form>
  );
}
