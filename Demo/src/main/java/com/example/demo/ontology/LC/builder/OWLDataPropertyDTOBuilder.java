package com.example.demo.ontology.LC.builder;

import com.example.demo.ontology.LC.dto.OWLDataPropertyDTO;

import java.util.List;

public class OWLDataPropertyDTOBuilder {

    private String id;
    private String type;
    public OWLDataPropertyDTOBuilder setId(String id) {
        this.id = id;
        return this;
    }

    public OWLDataPropertyDTOBuilder setType(String type) {
        this.type = type;
        return this;
    }

    public OWLDataPropertyDTO createOWLDataPropertyDTO() {
        return new OWLDataPropertyDTO(id, type);
    }
}
