package com.example.demo.ontology.LC.dto;

import java.util.List;
import java.util.Map;


public record OWLIndividualDTO(String id, Map<String, List<String>> objectPropertiesIdsWithValuesIds,
                               List<String> classesIds) {
}
