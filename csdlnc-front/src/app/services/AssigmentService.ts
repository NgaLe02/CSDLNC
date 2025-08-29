import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { AssigmentModel } from "../model/AssigmentModel";

export class AssignmentService {
  private static _assignmentService: AssignmentService;

  public static getInstance(): AssignmentService {
    if (!AssignmentService._assignmentService) {
      AssignmentService._assignmentService = new AssignmentService();
    }
    return AssignmentService._assignmentService;
  }

  public getLstAssigment(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/assignment/getLstAssigment",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertAssigment(model: AssigmentModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/assignment/insertAssigment"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateAssigment(model: AssigmentModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/assignment/updateAssigment"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteAssigment(id: string) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/assignment/" + id + "/deleteAssigment"
    )
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
