package com.example.demo.ontology.LC.builder;

import com.example.demo.ontology.LC.dto.OWLLearningContentResultDTO;

import java.util.List;

public class OWLLearningContentResultDTOBuilder{
    private List<String> individualsIds;

    public OWLLearningContentResultDTOBuilder setIndividualsIds(List<String> individualsIds) {
        this.individualsIds = individualsIds;
        return this;
    }

    public OWLLearningContentResultDTO createOWLLearningContentResultDTO() {
        return new OWLLearningContentResultDTO(individualsIds);
    }

}
