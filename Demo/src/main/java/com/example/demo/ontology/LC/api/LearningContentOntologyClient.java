package com.example.demo.ontology.LC.api;


import com.example.demo.ontology.LC.dto.*;
import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import lombok.NonNull;
import org.apache.tomcat.util.json.ParseException;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyChange;

import java.io.FileNotFoundException;
import java.util.List;

public interface LearningContentOntologyClient {
    List<OWLNodeDTO> getClassIdTree(@NonNull OWLOntology ontology);

    List<OWLNodeDTO> getAllIndividualIdList(@NonNull OWLOntology ontology);

    String getId(@NonNull OWLEntity owlEntity);

    OWLClassDTO getClassInfoByClassId(@NonNull String classId, @NonNull OWLOntology ontology);


    OWLIndividualDTO getIndividualInfoByIndividualId(@NonNull String individualId, @NonNull OWLOntology ontology);

    List<OWLObjectPropertyDTO> getAllObjectPropertiesIdsWithAllValuesByDomainId(@NonNull OWLOntology ontology, String domainId );

    List<OWLDataPropertyDTO> getAllDataPropertiesIdsWithTypeByDomainID(@NonNull OWLOntology ontology, String domainId) throws FileNotFoundException, ParseException;

    List<? extends OWLOntologyChange> updateClassChanges(SavingClassDTO classDTO, OWLOntology ontology);

    void saveOntology(List<? extends OWLOntologyChange> ontologyChanges, OWLOntology ontology);

    boolean checkExistClassByClassId(String classId, OWLOntology ontology);

    boolean checkExistIndividualByIndividualId(String individualId, OWLOntology ontology);

    void checkOntology(OWLOntology ontology);

    List<? extends OWLOntologyChange> deleteClassChanges(String classId, OWLOntology ontology);

    List<? extends OWLOntologyChange> createClassChanges(SavingClassDTO classDTO, OWLOntology ontology);


    List<? extends OWLOntologyChange> updateIndividualChanges(SavingIndividualDTO individualDTO, OWLOntology ontology);

    List<? extends OWLOntologyChange> createIndividualChanges(SavingIndividualDTO individualDTO, OWLOntology ontology);

    List<? extends OWLOntologyChange> deleteIndividualChanges(String individualId, OWLOntology ontology);

    OWLOntology getLCOntology();

    OWLLearningContentResultDTO getContentByStudentParameters(OWLOntology ontology, StudentParametersDTO studentParametersDTO);

    List<OWLDataPropertyDTO> getContentExplanations(OWLOntology ontology);
}
