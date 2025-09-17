package com.ptit.csdlnc.model.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.csdlnc.model.Assignment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AssignmentRequest {
	private List<Assignment> addOrUpdate;
	private List<Assignment> remove;

}
