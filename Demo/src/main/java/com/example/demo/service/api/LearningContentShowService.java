package com.example.demo.service.api;

import com.example.demo.ontology.LC.dto.*;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import org.apache.tomcat.util.json.ParseException;

import java.io.FileNotFoundException;
import java.util.List;

public interface LearningContentShowService {
    List<OWLNodeDTO> getClassIdTree();

    OWLClassDTO getClassInfoByClassId(String classId);

    OWLIndividualDTO getIndividualInfoByIndividualId(String individualId);

    List<OWLNodeDTO> getIndividualIdList();

    List<OWLObjectPropertyDTO> getObjectPropertyIdListWithValuesByDomainId(String domainId);

    List<OWLDataPropertyDTO> getDataPropertyIdListWithTypeByDomainId(String domainId) throws FileNotFoundException, ParseException;

    Object getContentByStudentParameters(StudentParametersDTO studentParametersDTO);

    Object getContentExplanations();
}
