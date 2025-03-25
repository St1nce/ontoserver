package com.example.demo.ontology.LC.builder;

import com.example.demo.ontology.LC.dto.OWLClassDTO;
import org.semanticweb.owlapi.model.OWLEquivalentClassesAxiom;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class OWLClassDTOBuilder {
    private String id;
    private Map<String, String> entityAnnotations;
    private List<String> equivalentAxioms;
    private List<String> individualsIds;
    private List<String> parentsIds;
    private List<String> childrenIds;

    public OWLClassDTOBuilder setId(String id) {
        this.id = id;
        return this;
    }

    public OWLClassDTOBuilder setEntityAnnotations(Map<String, String> entityAnnotations) {
        this.entityAnnotations = entityAnnotations;
        return this;
    }

    public OWLClassDTOBuilder setEquivalentAxioms(List<String> equivalentAxioms) {
        this.equivalentAxioms = equivalentAxioms;
        return this;
    }

    public OWLClassDTOBuilder setIndividualsIds(List<String> individualsIds) {
        this.individualsIds = individualsIds;
        return this;
    }

    public OWLClassDTOBuilder setParentsIds(List<String> parentsIds) {
        this.parentsIds = parentsIds;
        return this;
    }

    public OWLClassDTOBuilder setChildrenIds(List<String> childrenIds) {
        this.childrenIds = childrenIds;
        return this;
    }

    public OWLClassDTO createOWLClassDTO() {
        return new OWLClassDTO(id, entityAnnotations, equivalentAxioms, individualsIds, parentsIds, childrenIds);
    }
}