import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CarService } from "../../../../services/CarService";

export default function TypeCarForm(props: any) {
  return (
    <>
      {/* <div className="container-fluid pt-4 px-4"> */}
      {/* <div className="row g-4"> */}
      <div className="col-sm-12 col-xl-12">
        <div className="bg-light rounded h-100 p-4">
          {/* <h6 className="mb-4">Basic Form</h6> */}
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tên loại xe
              </label>
              <input
                type="text"
                className="form-control"
                id="tenLoaiXe"
                name="tenLoaiXe"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Số ghế
              </label>
              <input
                type="text"
                className="form-control"
                id="soGhe"
                name="soGhe"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
