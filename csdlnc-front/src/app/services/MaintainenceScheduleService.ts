import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { MaintainenceSchedule } from "../model/MaintainenceSchedule";

export class MaintainenceScheduleService {
  private static _maintainenceScheduleService: MaintainenceScheduleService;

  public static getInstance(): MaintainenceScheduleService {
    if (!MaintainenceScheduleService._maintainenceScheduleService) {
      MaintainenceScheduleService._maintainenceScheduleService = new MaintainenceScheduleService();
    }
    return MaintainenceScheduleService._maintainenceScheduleService;
  }

  public getLstMaintainenceSchedule(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/maintainenceSchedule/getLstMaintainenceSchedule",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public saveMaintainenceSchedule(model: MaintainenceSchedule) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/maintainenceSchedule/saveMaintainenceSchedule"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateMaintainenceSchedule(model: MaintainenceSchedule) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/maintainenceSchedule/updateMaintainenceSchedule"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteMaintainenceSchedule(id: number) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/maintainenceSchedule/" + id + "/deleteMaintainenceSchedule"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public getLstMaintainenceScheduleToCar(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/maintainenceSchedule/getLstMaintainenceScheduleToCar",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }
}
