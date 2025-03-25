package com.example.demo.rest.api;

import com.example.demo.rest.dto.request.LC.EntityIdDTO;
import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import com.example.demo.rest.dto.response.api.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/LC")
public interface LearningContentController {

    /**
     * Просмотр всех классов онтологии learning content
     *
     * @return дерево классов онтологии learning content
     */

    @GetMapping("/class/list")
    ResponseEntity<ResponseDto> getClassList();

    @GetMapping("/class/one/{classId}")
    ResponseEntity<ResponseDto> getClassOne(@PathVariable String classId);

    @PostMapping("/class/create")
    ResponseEntity<ResponseDto> createClass(@RequestBody SavingClassDTO classDTO);

    @PostMapping("/class/update")
    ResponseEntity<ResponseDto> updateClass(@RequestBody SavingClassDTO classDTO);

    @DeleteMapping("/class/delete")
    ResponseEntity<ResponseDto> deleteClass(@RequestBody EntityIdDTO idDTO);

    @GetMapping("/individual/list")
    ResponseEntity<ResponseDto> getIndividualList();

    @GetMapping("/individual/one/{individualId}")
    ResponseEntity<ResponseDto> getIndividualOne(@PathVariable String individualId);

    @PostMapping("/individual/create")
    ResponseEntity<ResponseDto> createIndividual(@RequestBody SavingIndividualDTO individualDTO);

    @PostMapping("/individual/update")
    ResponseEntity<ResponseDto> updateIndividual(@RequestBody SavingIndividualDTO individualDTO);

    @DeleteMapping("/individual/delete")
    ResponseEntity<ResponseDto> deleteIndividual(@RequestBody EntityIdDTO idDTO);

    @GetMapping("/objectProperty/list/{domainId}")
    ResponseEntity<ResponseDto> getObjectPropertyIdListWithValuesByDomainId(@PathVariable String domainId);

    @GetMapping("/dataProperty/list/{domainId}")
    ResponseEntity<ResponseDto> getDataPropertyIdListWithValuesByDomainId(@PathVariable String domainId);

    @PostMapping("/content/result")
    ResponseEntity<ResponseDto> getContentByStudentParameters(@RequestBody StudentParametersDTO studentParametersDTO);

    @GetMapping("/content/explanations")
    ResponseEntity<ResponseDto> getContentExplanations();
}