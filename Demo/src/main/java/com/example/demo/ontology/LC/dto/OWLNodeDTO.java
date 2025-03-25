package com.example.demo.ontology.LC.dto;

import java.util.ArrayList;
import java.util.List;

public class OWLNodeDTO {
    public String id;
    public List<String> parentsIds;

    public List<OWLNodeDTO> children;

    public OWLNodeDTO(String id) {
        this.id = id;
        this.parentsIds = new ArrayList<>();
        this.children = new ArrayList<>();
    }

    public OWLNodeDTO(String id, List<String> parentsIds) {
        this.id = id;
        this.parentsIds = parentsIds;
        this.children = new ArrayList<>();
    }
}
