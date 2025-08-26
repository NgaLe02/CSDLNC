package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.RouthSalaryDAO;
import com.ptit.csdlnc.model.RouteSalary;
import com.ptit.csdlnc.model.response.RouteSalaryResponse;

@Service
public class RouthSalaryService {
	@Autowired
	RouthSalaryDAO routhSalaryDAO;

	public List<RouteSalaryResponse> getLstRouteSalary(Map<String, Object> params) throws Exception {
		List<RouteSalaryResponse> result = routhSalaryDAO.getLstRouteSalary(params);
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
			result = routhSalaryDAO.insertRouteSalary(model);

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
			result = routhSalaryDAO.updateRouteSalary(model);

		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Dữ liệu đầu vào không hợp lệ hoặc vi phạm ràng buộc DB!", e);
		} catch (Exception e) {
			throw new RuntimeException("Có lỗi xảy ra khi thêm lương tuyến đường!", e);
		}
		return result;
	}

	public int deleteRouteSalary(int id) throws Exception {
		return routhSalaryDAO.deleteRouteSalary(id);
	}
}
