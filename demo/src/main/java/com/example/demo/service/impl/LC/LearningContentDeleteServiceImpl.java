package com.example.demo.service.impl.LC;

import com.example.demo.ontology.LC.api.LearningContentOntologyClient;
import com.example.demo.service.api.LC.LearningContentDeleteService;
import com.example.demo.service.exception.ServiceNotFoundException;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningContentDeleteServiceImpl implements LearningContentDeleteService {

    private LearningContentOntologyClient learningContentOntologyClient;

    @Autowired
    public void setOntology(LearningContentOntologyClient learningContentOntologyClient) {
        this.learningContentOntologyClient = learningContentOntologyClient;
    }

    @Override
    public void deleteClass(String classId) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();
        if (!learningContentOntologyClient.checkExistClassByClassId(classId, ontology))
            throw new ServiceNotFoundException("Класс не существует");
        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.deleteClassChanges(classId, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);
    }

    @Override
    public void deleteIndividual(String individualId) {
        OWLOntology ontology = learningContentOntologyClient.getLCOntology();

        if (!learningContentOntologyClient.checkExistIndividualByIndividualId(individualId, ontology))
            throw new ServiceNotFoundException("Экземпляр не существует");
        List<? extends OWLOntologyChange> changes = learningContentOntologyClient.deleteIndividualChanges(individualId, ontology);
        learningContentOntologyClient.saveOntology(changes, ontology);

    }
}
