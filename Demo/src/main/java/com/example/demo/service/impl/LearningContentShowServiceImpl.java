package com.example.demo.service.impl;

import com.example.demo.ontology.LC.api.LearningContentOntologyClient;
import com.example.demo.ontology.LC.dto.*;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import com.example.demo.service.api.LearningContentShowService;
import lombok.NonNull;
import org.apache.tomcat.util.json.ParseException;
import org.semanticweb.owlapi.model.OWLOntology;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;

@Service
public class LearningContentShowServiceImpl implements LearningContentShowService {

    private LearningContentOntologyClient learningContentOntologyClient;

    @Autowired
    public void setOntology(LearningContentOntologyClient learningContentOntologyClient) {
        this.learningContentOntologyClient = learningContentOntologyClient;
    }

    @Override
    public List<OWLNodeDTO> getClassIdTree() {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        List<OWLNodeDTO> classIdTree = learningContentOntologyClient.getClassIdTree(ontology);

        return classIdTree;
    }

    @Override
    public OWLClassDTO getClassInfoByClassId(@NonNull String classId) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        OWLClassDTO classInfo = learningContentOntologyClient.getClassInfoByClassId(classId, ontology);

        return classInfo;
    }

    @Override
    public OWLIndividualDTO getIndividualInfoByIndividualId(@NonNull String individualId) {

        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        OWLIndividualDTO individualInfo = learningContentOntologyClient.getIndividualInfoByIndividualId(individualId, ontology);

        return individualInfo;
    }

    @Override
    public List<OWLNodeDTO> getIndividualIdList() {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        List<OWLNodeDTO> individualIdList = learningContentOntologyClient.getAllIndividualIdList(ontology);

        return individualIdList;
    }

    @Override
    public List<OWLObjectPropertyDTO> getObjectPropertyIdListWithValuesByDomainId(String domainId) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        List<OWLObjectPropertyDTO> objectPropertiesIdsWithAllValues = learningContentOntologyClient.getAllObjectPropertiesIdsWithAllValuesByDomainId(ontology, domainId);

        return objectPropertiesIdsWithAllValues;
    }

    @Override
    public List<OWLDataPropertyDTO> getDataPropertyIdListWithTypeByDomainId(String domainId) throws FileNotFoundException, ParseException {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        List<OWLDataPropertyDTO> dataPropertiesIdsWithType = learningContentOntologyClient.getAllDataPropertiesIdsWithTypeByDomainID(ontology, domainId);

        return dataPropertiesIdsWithType;
    }

    @Override
    public OWLLearningContentResultDTO getContentByStudentParameters(StudentParametersDTO studentParametersDTO) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        OWLLearningContentResultDTO dataPropertiesIdsWithType = learningContentOntologyClient.getContentByStudentParameters(ontology, studentParametersDTO);

        return dataPropertiesIdsWithType;
    }

    @Override
    public Object getContentExplanations() {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        List<OWLDataPropertyDTO> dataPropertiesIdsWithType = learningContentOntologyClient.getContentExplanations(ontology);

        return dataPropertiesIdsWithType;
    }
}
