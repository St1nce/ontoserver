package com.example.demo.service.impl.LC;

import com.example.demo.ontology.LC.api.LearningContentOntologyClient;
import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;
import com.example.demo.service.api.LC.LearningContentSaveService;
import com.example.demo.service.exception.ServiceNotFoundException;
import com.example.demo.service.exception.ServiceRecordAlreadyExistsException;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningContentSaveServiceImpl implements LearningContentSaveService {

    private LearningContentOntologyClient learningContentOntologyClient;

    @Autowired
    public void setOntology(LearningContentOntologyClient learningContentOntologyClient) {
        this.learningContentOntologyClient = learningContentOntologyClient;
    }

    @Override
    public String createClass(SavingClassDTO classDTO) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();


        if (learningContentOntologyClient.checkExistClassByClassId(classDTO.getId(), ontology))
            throw new ServiceRecordAlreadyExistsException("Класс уже существует");

        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.createClassChanges(classDTO, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);

        return classDTO.getId();
    }

    @Override
    public String updateClass(SavingClassDTO classDTO) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        if (!learningContentOntologyClient.checkExistClassByClassId(classDTO.getId(), ontology))
            throw new ServiceNotFoundException("Класс не существует");

        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.updateClassChanges(classDTO, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);


        return classDTO.getId();
    }

    @Override
    public String createIndividual(SavingIndividualDTO individualDTO) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        if (learningContentOntologyClient.checkExistIndividualByIndividualId(individualDTO.getId(), ontology))
            throw new ServiceRecordAlreadyExistsException("Экземпляр уже существует");

        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.createIndividualChanges(individualDTO, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);

        return individualDTO.getId();
    }

    @Override
    public String updateIndividual(SavingIndividualDTO individualDTO) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        if (!learningContentOntologyClient.checkExistIndividualByIndividualId(individualDTO.getId(), ontology))
            throw new ServiceNotFoundException("Экземпляр не существует");

        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.updateIndividualChanges(individualDTO, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);


        return individualDTO.getId();
    }
}
