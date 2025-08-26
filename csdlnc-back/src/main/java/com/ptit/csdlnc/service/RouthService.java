package com.ptit.csdlnc.service;

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
public class RouthService {
	@Autowired
	RouteDAO routeDAO;

	@Autowired
	RouteSalaryDAO routeSalaryDAO;

	public List<RouteResponse> getLstRoute(Map<String, Object> params) throws Exception {
		List<RouteResponse> result = routeDAO.getLstRoute(params);
		return result;
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
			model.setMaLuongTuyen(maLuongTuyen);

			// Thêm tuyến đường
			result = routeDAO.insertRoute(model);

		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc DB!", e);
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
			model.setMaLuongTuyen(maLuongTuyen);

			result = routeDAO.updateRoute(model);

		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc DB!", e);
		}
		return result;
	}

	public int deleteRoute(int id) throws Exception {
		return routeDAO.deleteRoute(id);
	}
}
