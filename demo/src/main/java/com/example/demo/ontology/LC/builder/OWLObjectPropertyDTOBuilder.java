package com.example.demo.ontology.LC.builder;

import com.example.demo.ontology.LC.dto.OWLObjectPropertyDTO;

import java.util.List;

public class OWLObjectPropertyDTOBuilder {
    private String id;
    private List<String> individualsIds;

    public OWLObjectPropertyDTOBuilder setId(String id) {
        this.id = id;
        return this;
    }

    public OWLObjectPropertyDTOBuilder setIndividualsIds(List<String> individualsIds) {
        this.individualsIds = individualsIds;
        return this;
    }

    public OWLObjectPropertyDTO createOWLObjectPropertyDTO() {
        return new OWLObjectPropertyDTO(id, individualsIds);
    }
}