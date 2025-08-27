package com.ptit.csdlnc.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.ptit.csdlnc.dao.SeasonDAO;
import com.ptit.csdlnc.model.Season;
import com.ptit.csdlnc.model.response.SeasonResponse;

@Service
public class SeasonService {
	@Autowired
	SeasonDAO seasonDAO;

	public List<SeasonResponse> getLstSeason(Map<String, Object> params) throws Exception {
		List<SeasonResponse> result = seasonDAO.getLstSeason(params);
		return result;
	}

	public int insertSeason(Season model) throws Exception {
		int result = 0;
		try {
			result = seasonDAO.insertSeason(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("tenMua")) {
					throw new RuntimeException("Tên mùa đã tồn tại!");
				} else {
					throw new RuntimeException("Dữ liệu đã tồn tại!");
				}
			} else {
				throw new RuntimeException("Dữ liệu đã tồn tại!");
			}
		}
		return result;
	}

	public int updateSeason(Season model) throws Exception {
		int result = 0;
		try {
			result = seasonDAO.updateSeason(model);
		} catch (DuplicateKeyException e) {
			Throwable root = e.getRootCause();
			String msg = root != null ? root.getMessage() : e.getMessage();

			if (msg != null) {
				if (msg.contains("tenMua")) {
					throw new RuntimeException("Tên mùa đã tồn tại!");
				} else {
					throw new RuntimeException("Dữ liệu đã tồn tại!");
				}
			} else {
				throw new RuntimeException("Dữ liệu đã tồn tại!");
			}
		}
		return result;
	}

	public int deleteSeason(int id) throws Exception {
		return seasonDAO.deleteSeason(id);
	}
}
