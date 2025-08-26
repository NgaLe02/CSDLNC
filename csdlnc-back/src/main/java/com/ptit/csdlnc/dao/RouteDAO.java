package com.ptit.csdlnc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ptit.csdlnc.model.Route;
import com.ptit.csdlnc.model.response.RouteResponse;

@Mapper
public interface RouteDAO {
	List<RouteResponse> getLstRoute(Map<String, Object> params) throws Exception;

	int insertRoute(Route model) throws Exception;

	int updateRoute(Route model) throws Exception;

	int deleteRoute(int id) throws Exception;


}
