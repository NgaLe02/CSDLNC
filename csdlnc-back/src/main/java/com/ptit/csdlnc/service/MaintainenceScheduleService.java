package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.MaintainenceScheduleDAO;
import com.ptit.csdlnc.model.MaintainenceSchedule;
import com.ptit.csdlnc.model.response.MaintainenceScheduleResponse;

@Service
public class MaintainenceScheduleService {
	@Autowired
	MaintainenceScheduleDAO maintainceScheduleDAO;

	public List<MaintainenceScheduleResponse> getLstMaintainceSchedule(Map<String, Object> params) throws Exception {
		List<MaintainenceScheduleResponse> result = maintainceScheduleDAO.getLstMaintainenceSchedule(params);
		return result;
	}

	public int insertMaintainenceSchedule(MaintainenceSchedule model) throws Exception {
		try {
			return maintainceScheduleDAO.insertMaintainenceSchedule(model);
		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("ngayBaoDuong")) {
					throw new RuntimeException("Ngày bảo dưỡng cho xe đã tồn tại!");
				} else if (msg.contains("chiPhi")) {
					throw new RuntimeException("Chi phí không hợp lệ!");
				} else {
					throw new RuntimeException("Dữ liệu không hợp lệ: " + msg);
				}
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		}
	}

	public int updateMaintainenceSchedule(MaintainenceSchedule model) throws Exception {
		try {
			return maintainceScheduleDAO.updateMaintainenceSchedule(model);
		} catch (DataIntegrityViolationException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("ngayBaoDuong")) {
					throw new RuntimeException("Ngày bảo dưỡng cho xe đã tồn tại!");
				} else if (msg.contains("chiPhi")) {
					throw new RuntimeException("Chi phí không hợp lệ!");
				} else {
					throw new RuntimeException("Dữ liệu không hợp lệ: " + msg);
				}
			} else {
				throw new RuntimeException("Dữ liệu không hợp lệ!");
			}
		}
	}

	public int deleteMaintainenceSchedule(int id) throws Exception {
		return maintainceScheduleDAO.deleteMaintainenceSchedule(id);
	}
}
