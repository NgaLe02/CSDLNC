import axios from "axios";
import { ParamUtil } from "../utils/paramUtil";
import { HeadersUtil } from "../utils/headersUtil";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { TicketPriceModel } from "../model/TicketPriceModel";

export class TicketPriceService {
  private static _ticketPriceService: TicketPriceService;

  public static getInstance(): TicketPriceService {
    if (!TicketPriceService._ticketPriceService) {
      TicketPriceService._ticketPriceService = new TicketPriceService();
    }
    return TicketPriceService._ticketPriceService;
  }

  public getLstTicketPrice(request: any) {
    const params = ParamUtil.toRequestParams(request);
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticketPrice/getLstTicketPrice",
      params
    );
    return axios.get(url, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public insertTicketPrice(model: TicketPriceModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticketPrice/insertTicketPrice"
    );
    return axios.post(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public updateTicketPrice(model: TicketPriceModel) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticketPrice/updateTicketPrice"
    );
    return axios.put(url, model, {
      headers: HeadersUtil.getHeaders(),
    });
  }

  public deleteTicketPrice(request: any) {
    const url = ApiUrlUtil.buildQueryString(
      process.env.REACT_APP_API_URL + "/ticketPrice/deleteTicketPrice"
    );
    return axios.delete(url, {
      headers: HeadersUtil.getHeaders(),
      data: request,
    });
  }

  public findTicketPriceByTuyenAndMua(maTuyen: string, maMua: string) {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/ticketPrice/findByTuyenAndMua`,
      {
        params: { maTuyen, maMua },
        headers: HeadersUtil.getHeaders(),
      }
    );
  }
}
