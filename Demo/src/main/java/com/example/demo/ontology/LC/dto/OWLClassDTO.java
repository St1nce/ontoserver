package com.example.demo.ontology.LC.dto;

import java.util.List;
import java.util.Map;

public record OWLClassDTO(String id, Map<String, String> annotations, List<String> equivalentAxioms,
                          List<String> individualsIds, List<String> parentsIds, List<String> childrenIds) {
}