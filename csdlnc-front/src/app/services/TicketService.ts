import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { TicketModel } from "../model/TicketModel";

export class TicketService {
  private static _ticketService: TicketService;

  public static getInstance(): TicketService {
    if (!TicketService._ticketService) {
      TicketService._ticketService = new TicketService();
    }
    return TicketService._ticketService;
  }

  public getLstTicket(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticket/getLstTicket",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertTicket(model: TicketModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticket/insertTicket"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateTicket(model: TicketModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticket/updateTicket"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteTicket(payload: { maChuyen: string, maXe: string, maTuyen: string, maVe: number }) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL +
      "/ticket/deleteTicket"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
      data: payload,
    });
  }
}
