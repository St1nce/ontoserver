package com.example.demo.ontology.LC.single;

import com.example.demo.service.exception.ServiceNotFoundException;
import org.semanticweb.owlapi.io.UnparsableOntologyException;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;

/**
 *
 */
public class SingleLCOntology {
    @Value("${ontology.filename}")
    static String ontologyFileName = "../demo-ontology/LearnerModel_LAST.owl"; // TODO: вывести в config файл
    static OWLOntology ontology = null;

    /**
     *
     * @param ontologyManager
     * @return
     */
    public static synchronized OWLOntology getOntology(OWLOntologyManager ontologyManager) {
        if(ontology == null) {
            try {
                File ontologyFile = new File(ontologyFileName);
                ontology = ontologyManager.loadOntologyFromOntologyDocument(ontologyFile);
            } catch (UnparsableOntologyException e) {
                throw new RuntimeException("Ошибка при парсинге онтологии");
            } catch (OWLOntologyCreationException e) {
                throw new RuntimeException("Ошибка при открытии онтологии");
            } catch (ServiceNotFoundException e) {
                throw e;
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return ontology;
    }
}
