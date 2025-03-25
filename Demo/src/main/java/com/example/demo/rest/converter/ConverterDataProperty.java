package com.example.demo.rest.converter;

import com.example.demo.rest.dto.request.LC.DataPropertyDTO;
import com.example.demo.service.exception.ServiceNotFoundException;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLNamedIndividual;

public class ConverterDataProperty {
    private final OWLDataFactory dataFactory;

    public ConverterDataProperty(OWLDataFactory dataFactory) {
        this.dataFactory = dataFactory;
    }

    public OWLDataPropertyAssertionAxiom getOWLDataPropertyAssertionAxiom(
            OWLDataProperty dataProperty,
            OWLNamedIndividual individual,
            DataPropertyDTO dataPropertyDTO) {
        return switch (dataPropertyDTO.type) {
            case "integer" ->
                    dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, Integer.parseInt(dataPropertyDTO.value));
            case "boolean" ->
                    dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, Boolean.parseBoolean(dataPropertyDTO.value));
            case "string" ->
                    dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, dataPropertyDTO.value);
            default -> throw new ServiceNotFoundException("[type] не найден");
        };
    }
}
