package com.example.demo.rest.dto.request.LC;

import lombok.Data;


@Data
public class DataPropertyDTO {
    public String type;

    public String value;

    public DataPropertyDTO(String type, String value) {
        this.type = type;
        this.value = value;
    }
}
