package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Season;
import com.ptit.csdlnc.model.response.SeasonResponse;

@Mapper
public interface SeasonDAO {
	List<SeasonResponse> getLstSeason(Map<String, Object> params) throws Exception;

	int insertSeason(Season model) throws Exception;

	int updateSeason(Season model) throws Exception;

	int deleteSeason(String id) throws Exception;

}
