package com.example.demo.service.api.LC;

public interface LearningContentDeleteService {

    /**
     * Удаляет класс онтологии вместе со всеми существующими связями
     *
     * @param classId короткое имя класса
     */
    void deleteClass(String classId);

    void deleteIndividual(String individualId);
}
