package com.example.demo.service.api.LC;

import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;

public interface LearningContentSaveService {

    String createClass(SavingClassDTO classDTO);

    String updateClass(SavingClassDTO classDTO);

    String createIndividual(SavingIndividualDTO individualDTO);

    String updateIndividual(SavingIndividualDTO individualDTO);
}
