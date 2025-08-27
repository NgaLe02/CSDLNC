package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.TripDAO;
import com.ptit.csdlnc.model.Trip;
import com.ptit.csdlnc.model.response.TripResponse;

@Service
public class TripService {
	@Autowired
	TripDAO tripDAO;

	public List<TripResponse> getLstTrip(Map<String, Object> params) throws Exception {
		List<TripResponse> result = tripDAO.getLstTrip(params);
		return result;
	}

	public int insertTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.insertTrip(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

//			if (msg != null) {
//				if (msg.contains("tenMua")) {
//					throw new RuntimeException("Tên mùa đã tồn tại!");
//				} else {
//					throw new RuntimeException("Dữ liệu đã tồn tại!");
//				}
//			} else {
//				throw new RuntimeException("Dữ liệu đã tồn tại!");
//			}
		}
		return result;
	}

	public int updateTrip(Trip model) throws Exception {
		int result = 0;
		try {
			result = tripDAO.updateTrip(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

//			if (msg != null) {
//				if (msg.contains("tenMua")) {
//					throw new RuntimeException("Tên mùa đã tồn tại!");
//				} else {
//					throw new RuntimeException("Dữ liệu đã tồn tại!");
//				}
//			} else {
//				throw new RuntimeException("Dữ liệu đã tồn tại!");
//			}
		}
		return result;
	}

	public int deleteTrip(int id) throws Exception {
		return tripDAO.deleteTrip(id);
	}
}
