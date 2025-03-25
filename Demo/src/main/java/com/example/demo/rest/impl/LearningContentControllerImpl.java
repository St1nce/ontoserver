package com.example.demo.rest.impl;

import com.example.demo.rest.api.LearningContentController;
import com.example.demo.rest.dto.request.LC.EntityIdDTO;
import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import com.example.demo.rest.dto.response.api.ResponseDto;
import com.example.demo.rest.dto.response.error.ResponseErrorDtoImpl;
import com.example.demo.rest.dto.response.success.ResponseSuccessDto;
import com.example.demo.service.api.LC.LearningContentDeleteService;
import com.example.demo.service.api.LC.LearningContentSaveService;
import com.example.demo.service.api.LearningContentShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LearningContentControllerImpl implements LearningContentController {

    private LearningContentShowService learningContentShowService;
    private LearningContentSaveService learningContentSaveService;
    private LearningContentDeleteService learningContentDeleteService;

    @Autowired
    public void setShowService(LearningContentShowService learningContentShowService) {
        this.learningContentShowService = learningContentShowService;
    }

    @Autowired
    public void setSaveService(LearningContentSaveService learningContentSaveService) {
        this.learningContentSaveService = learningContentSaveService;
    }

    @Autowired
    public void setDeleteService(LearningContentDeleteService learningContentDeleteService) {
        this.learningContentDeleteService = learningContentDeleteService;
    }

    @Override
    @GetMapping("/class/list")
    public ResponseEntity<ResponseDto> getClassList() {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getClassIdTree());
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping("/class/one/{classId}")
    public ResponseEntity<ResponseDto> getClassOne(@PathVariable String classId) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getClassInfoByClassId(classId));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/class/create")
    public ResponseEntity<ResponseDto> createClass(@RequestBody SavingClassDTO classDTO) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentSaveService.createClass(classDTO));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/class/update")
    public ResponseEntity<ResponseDto> updateClass(@RequestBody SavingClassDTO classDTO) {
        try {

            return ResponseSuccessDto.sendResponse(learningContentSaveService.updateClass(classDTO));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @DeleteMapping("/class/delete")
    public ResponseEntity<ResponseDto> deleteClass(@RequestBody EntityIdDTO idDTO) {
        try {
            learningContentDeleteService.deleteClass(idDTO.getId());
            return ResponseSuccessDto.sendResponse();
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }


    @Override
    @GetMapping("/individual/list")
    public ResponseEntity<ResponseDto> getIndividualList() {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getIndividualIdList());
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping("/individual/one/{individualId}")
    public ResponseEntity<ResponseDto> getIndividualOne(@PathVariable String individualId) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getIndividualInfoByIndividualId(individualId));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/individual/create")
    public ResponseEntity<ResponseDto> createIndividual(@RequestBody SavingIndividualDTO individualDTO) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentSaveService.createIndividual(individualDTO));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/individual/update")
    public ResponseEntity<ResponseDto> updateIndividual(@RequestBody SavingIndividualDTO individualDTO) {
        try {

            return ResponseSuccessDto.sendResponse(learningContentSaveService.updateIndividual(individualDTO));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @DeleteMapping("/individual/delete")
    public ResponseEntity<ResponseDto> deleteIndividual(@RequestBody EntityIdDTO idDTO) {
        try {
            learningContentDeleteService.deleteIndividual(idDTO.getId());
            return ResponseSuccessDto.sendResponse();
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping("/objectProperty/list/{domainId}")
    public ResponseEntity<ResponseDto> getObjectPropertyIdListWithValuesByDomainId(@PathVariable String domainId) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getObjectPropertyIdListWithValuesByDomainId(domainId));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping("/dataProperty/list/{domainId}")
    public ResponseEntity<ResponseDto> getDataPropertyIdListWithValuesByDomainId(@PathVariable String domainId) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getDataPropertyIdListWithTypeByDomainId(domainId));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @PostMapping("/content/result")
    public ResponseEntity<ResponseDto> getContentByStudentParameters(@RequestBody StudentParametersDTO studentParametersDTO) {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getContentByStudentParameters(studentParametersDTO));
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }

    @Override
    @GetMapping("/content/explanations")
    public ResponseEntity<ResponseDto> getContentExplanations() {
        try {
            return ResponseSuccessDto.sendResponse(learningContentShowService.getContentExplanations());
        } catch (Exception e) {
            return ResponseErrorDtoImpl.sendErrorWithStatus(e);
        }
    }
}
