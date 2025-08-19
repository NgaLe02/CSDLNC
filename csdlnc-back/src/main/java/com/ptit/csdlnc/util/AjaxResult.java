package com.ptit.csdlnc.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class AjaxResult{

	private String message;
	private boolean status;
	private Object responseData;

	public AjaxResult(String message, boolean status, Object responseData) {
		super();
		this.message = message;
		this.status = status;
		this.responseData = responseData;
	}

	public AjaxResult() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Object getResponseData() {
		return responseData;
	}

	public void setResponseData(Object responseData) {
		this.responseData = responseData;
	}
	
	public Map<String, Object> toMap() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Field[] fields = AjaxResult.class.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			
			resultMap.put(field.getName(), field.get(this));
		}
		
		return resultMap;
	}
}
