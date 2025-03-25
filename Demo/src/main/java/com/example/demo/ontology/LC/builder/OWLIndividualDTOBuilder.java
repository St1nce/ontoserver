package com.example.demo.ontology.LC.builder;

import com.example.demo.ontology.LC.dto.OWLIndividualDTO;
import java.util.List;
import java.util.Map;

public class OWLIndividualDTOBuilder {
    private String id;
    private Map<String, List<String>> objectPropertiesIdsWithValuesIds;
    private List<String> classesIds;

    public OWLIndividualDTOBuilder setId(String id) {
        this.id = id;
        return this;
    }

    public OWLIndividualDTOBuilder setObjectPropertiesIdsWithValuesIds(Map<String, List<String>> objectPropertiesIdsWithValuesIds) {
        this.objectPropertiesIdsWithValuesIds = objectPropertiesIdsWithValuesIds;
        return this;
    }

    public OWLIndividualDTOBuilder setClassesIds(List<String> classesIds) {
        this.classesIds = classesIds;
        return this;
    }

    public OWLIndividualDTO createOWLIndividualDTO() {
        return new OWLIndividualDTO(id, objectPropertiesIdsWithValuesIds, classesIds);
    }
}