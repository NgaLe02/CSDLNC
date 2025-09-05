package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.RouteSalaryDAO;
import com.ptit.csdlnc.model.RouteSalary;
import com.ptit.csdlnc.model.response.RouteSalaryResponse;

@Service
public class RouteSalaryService {
	@Autowired
	RouteSalaryDAO routeSalaryDAO;

	public List<RouteSalaryResponse> getLstRouteSalary(Map<String, Object> params) throws Exception {
		List<RouteSalaryResponse> result = routeSalaryDAO.getLstRouteSalary(params);
		return result;
	}

	public int insertRouteSalary(RouteSalary model) throws Exception {
		int result = 0;
		try {
			if (model.getDoPhucTap() == null
					|| !(model.getDoPhucTap() == 1 || model.getDoPhucTap() == 2 || model.getDoPhucTap() == 3)) {
				throw new RuntimeException("Độ phức tạp chỉ được phép là 1, 2 hoặc 3!");
			}
			Double luongCoBan = model.getLuongCoBan();
			if (luongCoBan == null) {
				throw new RuntimeException("Không thể tính lương cơ bản vì dữ liệu không hợp lệ!");
			}
			result = routeSalaryDAO.insertRouteSalary(model);

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

	public int updateRouteSalary(RouteSalary model) throws Exception {
		int result = 0;
		try {
			if (model.getDoPhucTap() == null
					|| !(model.getDoPhucTap() == 1 || model.getDoPhucTap() == 2 || model.getDoPhucTap() == 3)) {
				throw new RuntimeException("Độ phức tạp chỉ được phép là 1, 2 hoặc 3!");
			}
			Double luongCoBan = model.getLuongCoBan();
			if (luongCoBan == null) {
				throw new RuntimeException("Không thể tính lương cơ bản vì dữ liệu không hợp lệ!");
			}
			result = routeSalaryDAO.updateRouteSalary(model);

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

	public int deleteRouteSalary(int id) throws Exception {
		return routeSalaryDAO.deleteRouteSalary(id);
	}

	public RouteSalaryResponse findRouteSalayByDoPhucTapAndKc(Map<String, Object> params) throws Exception {
		RouteSalaryResponse result = routeSalaryDAO.findRouteSalayByDoPhucTapAndKc(params);
		if (result == null) {
			throw new RuntimeException("Không tìm thấy lương tuyến phù hợp với độ phức tạp và khoảng cách!");
		}
		return result;
	}
}
