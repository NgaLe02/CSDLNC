import { HttpStatusCode } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { EmployeeModel } from "../../../model/EmployeeModel";
import EmployeeForm from "./component/EmployeeForm";
import { EmployeeService } from "../../../services/EmployeeService";
import PaginationCommon from "../../../common/PaginationCommon";

export default function Employee() {
  const [listData, setListData] = useState<EmployeeModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingModel, setEditingModel] = useState<EmployeeModel>(
    new EmployeeModel()
  );
  const totalElement = useRef(0);
  const [modelSearch, setModelSearch] = useState<any>({
    limit: 10,
    page: 1,
    time: new Date().getTime(),
  });

  useEffect(() => {
    getLstEmployee();
  }, [modelSearch.time]);

  function getLstEmployee() {
    EmployeeService.getInstance()
      .getLstEmployee(modelSearch)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data.status) {
            const data = response.data.responseData.data;
            totalElement.current = response.data.responseData.count;
            setListData(data);
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function handleAdd() {
    setEditingModel(new EmployeeModel());
    setShowForm(true);
  }

  function handleEdit(model: EmployeeModel) {
    setEditingModel(model);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    EmployeeService.getInstance()
      .deleteEmployee(id)
      .then((resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          if (resp.data.status) {
            toast.success(resp.data.message);
            getLstEmployee();
          } else {
            toast.error(resp.data.message);
          }
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra");
      });
  }

  function closeModal(status: boolean) {
    setShowForm(false);
    getLstEmployee();

  }

  const handlePageChange = (page: number) => {
    setModelSearch({
      ...modelSearch,
      page: page,
      time: new Date().getTime(),
    });
  };

  const handleChangeSearch = (event: any) => {
    setModelSearch({
      ...modelSearch,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light rounded p-4">
          <form className="row g-3">
            {/* Tìm theo họ tên / số điện thoại */}
            <div className="col-md-4">
              <label className="form-label" htmlFor="muaTuNgay">Hành khách</label>
              <input
                type="search"
                className="form-control"
                placeholder="Nhập họ tên hoặc số điện thoại"
                name="keyword"
                onChange={(e) => handleChangeSearch(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setModelSearch((prev: any) => ({
                      ...prev,
                      time: new Date().getTime(),
                      page: 1
                    }));
                  }
                }}
              />
            </div>

            {/* Nút tìm kiếm */}
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="button" // dùng type="button" để tránh reload form
                className="btn btn-primary w-100"
                onClick={() => {
                  setModelSearch((prev: any) => ({
                    ...prev,
                    time: new Date().getTime(),
                    page: 1
                  }));
                }}
              >
                Tìm kiếm
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">
              Danh sách nhân viên ({totalElement.current} nhân viên) (cần có tối thiểu 2 nhân viên)
            </h6>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              Thêm nhân viên
            </button>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col" style={{ width: "5%" }}></th>
                  <th scope="col" style={{ width: "5%" }}>
                    STT
                  </th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">CMND</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listData.map((item: EmployeeModel, index: number) => (
                  <tr key={item.maNhanVien}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{totalElement.current - (modelSearch.page - 1) * modelSearch.limit - index}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.cmnd}</td>
                    <td>{item.soDienThoai}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(item.maNhanVien!)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <PaginationCommon
              currentPage={modelSearch.page}
              count={totalElement.current}
              onPageChange={handlePageChange}
              rows={modelSearch.limit}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingModel.maNhanVien ? "Sửa nhân viên" : "Thêm nhân viên"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <EmployeeForm
                  model={editingModel}
                  closeModal={(status: boolean) => {
                    closeModal(status);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && <div className="modal-backdrop fade show"></div>}
    </>
  );
}
