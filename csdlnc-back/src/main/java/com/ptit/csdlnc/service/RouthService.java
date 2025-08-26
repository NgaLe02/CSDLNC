package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.RouteDAO;
import com.ptit.csdlnc.model.Route;
import com.ptit.csdlnc.model.response.RouteResponse;

@Service
public class RouthService {
	@Autowired
	RouteDAO routeDAO;

	public List<RouteResponse> getLstRoute(Map<String, Object> params) throws Exception {
		List<RouteResponse> result = routeDAO.getLstRoute(params);
		return result;
	}

	public int insertRoute(Route model) throws Exception {
		int result = 0;
		try {
			if (model.getDoPhucTap() == null
					|| !(model.getDoPhucTap() == 1 || model.getDoPhucTap() == 2 || model.getDoPhucTap() == 3)) {
				throw new RuntimeException("Độ phức tạp chỉ được phép là 1, 2 hoặc 3!");
			}
//			Double luongCoBan = model.getLuongCoBan();
//			if (luongCoBan == null) {
//				throw new RuntimeException("Không thể tính lương cơ bản vì dữ liệu không hợp lệ!");
//			}
			result = routeDAO.insertRoute(model);

		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc DB!", e);
		} catch (DataAccessException ex) {
			String errorMessage = "Lỗi không xác định";
			if (ex.getRootCause() != null) {
				errorMessage = ex.getRootCause().getMessage();
			}
			throw new RuntimeException(errorMessage);
		} catch (Exception e) {
			throw new RuntimeException("Có lỗi xảy ra khi thêm lương tuyến đường!", e);
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
//			Double luongCoBan = model.getLuongCoBan();
//			if (luongCoBan == null) {
//				throw new RuntimeException("Không thể tính lương cơ bản vì dữ liệu không hợp lệ!");
//			}
			result = routeDAO.updateRoute(model);

		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc DB!", e);
		} catch (Exception e) {
			throw new RuntimeException("Có lỗi xảy ra khi thêm lương tuyến đường!", e);
		}
		return result;
	}

	public int deleteRoute(int id) throws Exception {
		return routeDAO.deleteRoute(id);
	}
}
