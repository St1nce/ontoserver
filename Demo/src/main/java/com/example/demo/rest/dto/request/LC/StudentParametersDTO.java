package com.example.demo.rest.dto.request.LC;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.*;

import java.util.Map;

@Data
public class StudentParametersDTO {
    @Getter
    @Setter
    @NonNull
    @JsonProperty("dataPropertiesIdsWithValue")
    @JsonDeserialize(contentAs= DataPropertyDTO.class)
    private Map<String, DataPropertyDTO> dataPropertiesIdsWithValue;

    @JsonCreator
    StudentParametersDTO(Map<String, DataPropertyDTO> dataPropertiesIdsWithValue){
        this.dataPropertiesIdsWithValue = dataPropertiesIdsWithValue;
    }
}