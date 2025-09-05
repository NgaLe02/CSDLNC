package com.ptit.csdlnc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.RouteDAO;
import com.ptit.csdlnc.dao.RouteSalaryDAO;
import com.ptit.csdlnc.model.Route;
import com.ptit.csdlnc.model.response.RouteResponse;

@Service
public class RouteService {
	@Autowired
	RouteDAO routeDAO;

	@Autowired
	RouteSalaryDAO routeSalaryDAO;

	public Map<String, Object> getLstRoute(Map<String, Object> params) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		if (params.get("limit") != null && params.get("page") != null) {
			int limit = Integer.parseInt(params.get("limit").toString());
			int page = Integer.parseInt(params.get("page").toString());
			int offset = (page - 1) * limit;
			params.put("offset", offset);
			params.put("limit", limit);
		}

		List<RouteResponse> result = routeDAO.getLstRoute(params);
		resultMap.put("data", result);
		resultMap.put("count", routeDAO.countLstRoute(params));
		return resultMap;
	}

	public int insertRoute(Route model) throws Exception {
		int result = 0;
		try {
			// Validate độ phức tạp
			if (model.getDoPhucTap() == null
					|| !(model.getDoPhucTap() == 1 || model.getDoPhucTap() == 2 || model.getDoPhucTap() == 3)) {
				throw new RuntimeException("Độ phức tạp chỉ được phép là 1, 2 hoặc 3!");
			}

			// Lấy maLuongTuyen tương ứng dựa trên doPhucTap và khoangCach
			Integer maLuongTuyen = routeSalaryDAO.findMaLuongTuyen(model.getDoPhucTap(), model.getKhoangCach());
			if (maLuongTuyen == null) {
				throw new RuntimeException("Không tìm thấy lương tuyến phù hợp với độ phức tạp và khoảng cách!");
			}
			if (maLuongTuyen != model.getMaLuongTuyen()) {
				throw new RuntimeException("Lương tuyến có sự thay đổi. Hãy cập nhật lại!");
			}
			model.setMaLuongTuyen(maLuongTuyen);

			// Thêm tuyến đường
			result = routeDAO.insertRoute(model);

		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		} catch (DataAccessException ex) {
			String errorMessage = "Lỗi không xác định";
			if (ex.getRootCause() != null) {
				errorMessage = ex.getRootCause().getMessage();
			}
			throw new RuntimeException(errorMessage);
		}
		return result;
	}

	public int updateRoute(Route model) throws Exception {
		int result = 0;
		try {
			if (model.getDoPhucTap() == null
					|| !(model.getDoPhucTap() == 1 || model.getDoPhucTap() == 2 || model.getDoPhucTap() == 3)) {
				throw new RuntimeException("Độ phức tạp chỉ được phép là 1, 2 hoặc 3!");
			}
			// Lấy maLuongTuyen tương ứng dựa trên doPhucTap và khoangCach
			Integer maLuongTuyen = routeSalaryDAO.findMaLuongTuyen(model.getDoPhucTap(), model.getKhoangCach());
			if (maLuongTuyen == null) {
				throw new RuntimeException("Không tìm thấy lương tuyến phù hợp với độ phức tạp và khoảng cách!");
			}
			if (maLuongTuyen != model.getMaLuongTuyen()) {
				throw new RuntimeException("Lương tuyến có sự thay đổi. Hãy cập nhật lại!");
			}
			model.setMaLuongTuyen(maLuongTuyen);

			result = routeDAO.updateRoute(model);

		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				throw new RuntimeException(msg);
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		}
		return result;
	}

	public int deleteRoute(int id) throws Exception {
		return routeDAO.deleteRoute(id);
	}
}
