package com.example.demo.rest.dto.request.LC;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class SavingClassDTO {

    @Getter
    @Setter
    @NonNull
    private String id;

    @Getter
    @Setter
    @NonNull
    private Map<String, String> annotations;

    @Getter
    @Setter
    @NonNull
    private List<String> equivalentAxioms;

    @Getter
    @Setter
    @NonNull
    private String parentId;


}
