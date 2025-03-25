package com.example.demo.ontology.LC.impl;

import com.example.demo.ontology.LC.api.LearningContentOntologyClient;
import com.example.demo.ontology.LC.builder.*;
import com.example.demo.ontology.LC.dto.*;
import com.example.demo.ontology.LC.single.SingleLCOntology;
import com.example.demo.rest.converter.ConverterDataProperty;
import com.example.demo.rest.dto.request.LC.DataPropertyDTO;
import com.example.demo.rest.dto.request.LC.SavingClassDTO;
import com.example.demo.rest.dto.request.LC.SavingIndividualDTO;
import com.example.demo.rest.dto.request.LC.StudentParametersDTO;
import com.example.demo.service.exception.ServiceNotFoundException;
import lombok.NonNull;
import org.apache.tomcat.util.json.ParseException;
import org.semanticweb.HermiT.Reasoner;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.expression.ShortFormEntityChecker;
import org.semanticweb.owlapi.manchestersyntax.renderer.ManchesterOWLSyntaxOWLObjectRendererImpl;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.model.parameters.OntologyCopy;
import org.semanticweb.owlapi.reasoner.OWLReasoner;
import org.semanticweb.owlapi.util.*;
import org.semanticweb.owlapi.util.mansyntax.ManchesterOWLSyntaxParser;
import org.semanticweb.owlapi.vocab.OWLRDFVocabulary;
import org.springframework.stereotype.Repository;

import java.io.FileNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

import static org.semanticweb.owlapi.search.EntitySearcher.getObjectPropertyValues;
import static org.semanticweb.owlapi.search.Searcher.annotationObject;


@Repository
public class LearningContentOntologyClientImpl implements LearningContentOntologyClient {

    final OWLOntologyManager ontologyManager;
    final OWLDataFactory dataFactory;
    final Reasoner.ReasonerFactory reasonerFactory;

    final ConverterDataProperty converterDataProperty;

    LearningContentOntologyClientImpl() {
        this.ontologyManager = OWLManager.createConcurrentOWLOntologyManager();
        this.dataFactory = ontologyManager.getOWLDataFactory();
        this.reasonerFactory = new Reasoner.ReasonerFactory();
        this.converterDataProperty = new ConverterDataProperty(dataFactory);
    }


    @Override
    public List<OWLNodeDTO> getClassIdTree(@NonNull OWLOntology ontology) {

        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        // все классы онтологии кроме owl:Thing и owl:Nothing
        List<OWLNodeDTO> allClasses = ontology
                .getClassesInSignature()
                .stream()
                .map((owlClass) -> new OWLNodeDTO(this.getId(owlClass), reasoner
                        .getSuperClasses(owlClass, true)
                        .getFlattened()
                        .stream()
                        .map(this::getId)
                        .toList()))
                .toList();

        reasoner.dispose();


        Map<String, OWLNodeDTO> obj = allClasses.stream()
                                                .collect(Collectors.toMap(classNode -> classNode.id, classNode -> classNode));

        for (OWLNodeDTO el : allClasses) {
            for (String parentId : el.parentsIds) {
                if (obj.get(parentId) == null) continue;
                obj.get(parentId).children.add(el);
            }
        }

        for (OWLNodeDTO el : allClasses) {
            for (String parentId : el.parentsIds) {
                if (parentId.equals("Thing")) continue;
                obj.remove(el.id);
            }
        }

        return new ArrayList<>(obj.values());
    }


    @Override
    public List<OWLNodeDTO> getAllIndividualIdList(@NonNull OWLOntology ontology) {
        return ontology
                .getIndividualsInSignature()
                .stream()
                .map(this::getId)
                .sorted()
                .map(OWLNodeDTO::new)
                .toList();
    }


    private Map<String, String> getEntityAnnotations(@NonNull OWLEntity entity, @NonNull OWLOntology ontology) {
        Map<String, String> entityAnnotations = new HashMap<>();

        // OWLRDFVocabulary - enum http://owlcs.github.io/owlapi/apidocs_5/org/semanticweb/owlapi/vocab/OWLRDFVocabulary.html
        // .values - Возвращает массив, содержащий константы этого перечисляемого типа, в порядке их объявления.
        for (OWLRDFVocabulary vocabularyProperty : OWLRDFVocabulary.values()) {

            //OWLAnnotationProperty - Представляет свойство аннотации в спецификации OWL 2. https://www.w3.org/TR/owl2-syntax/#Annotation_Properties
            OWLAnnotationProperty annotationProperty = dataFactory.getOWLAnnotationProperty(vocabularyProperty.getIRI());

            // OWLAnnotationAssertionAxiom - Представляет аксиомы AnnotationAssertion в спецификации OWL 2. https://www.w3.org/TR/owl2-syntax/#Annotation_Assertion
            //.getAnnotationAssertionAxioms Получает аксиомы, которые аннотируют указанную сущность.
            for (OWLAnnotationAssertionAxiom annotationAssertionAxiom : ontology.getAnnotationAssertionAxioms(entity.getIRI())) {

                // https://owlcs.github.io/owlapi/apidocs_4/org/semanticweb/owlapi/search/Searcher.html
                // annotationObject - Извлеките аннотацию из аксиомы утверждения аннотации
                for (OWLAnnotation annotation : annotationObject(annotationAssertionAxiom, annotationProperty).toList()) {
                    OWLAnnotationValue annotationValue = annotation.getValue();

                    if (annotationValue instanceof OWLLiteral) {
                        entityAnnotations.put(vocabularyProperty.getShortForm(), ((OWLLiteral) annotationValue).getLiteral());
                    }

                }
            }
        }


        return entityAnnotations;
    }

    private List<String> getClassIndividualsIds(@NonNull OWLClass owlClass, @NonNull OWLOntology ontology, boolean direct) {
        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        List<String> individualsIds = reasoner
                .getInstances(owlClass, direct)
                .getFlattened()
                .stream()
                .map(this::getId)
                .sorted()
                .toList();

        reasoner.dispose();

        return individualsIds;
    }

    private List<String> getClassParentsIds(@NonNull OWLClass owlClass, @NonNull OWLOntology ontology) {
        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        List<String> parentsIds = reasoner
                .getSuperClasses(owlClass, true)
                .getFlattened()
                .stream()
                .map(this::getId)
                .filter((owlClassId) -> !owlClassId.equals("Thing"))
                .sorted()
                .toList();

        reasoner.dispose();

        return parentsIds;

    }

    private List<String> getClassChildrenIds(@NonNull OWLClass owlClass, @NonNull OWLOntology ontology) {
        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        List<String> childrenIds = reasoner
                .getSubClasses(owlClass, true)
                .getFlattened()
                .stream()
                .map(this::getId)
                .filter((owlClassId) -> !owlClassId.equals("Nothing"))
                .sorted()
                .toList();

        reasoner.dispose();

        return childrenIds;
    }

    private List<String> getEquivalentAxioms(@NonNull OWLClass owlClass, @NonNull OWLOntology ontology) {

        // OWLEquivalentClassesAxiom - Представляет аксиому эквивалентных классов в спецификации OWL 2. https://www.w3.org/TR/owl2-syntax/#Equivalent_Classes
        // .getEquivalentClassesAxioms - Получает все эквивалентные аксиомы в этой онтологии, которые содержат указанный класс в качестве операнда.
        Set<OWLEquivalentClassesAxiom> equivalentAxioms = ontology.getEquivalentClassesAxioms(owlClass);

        // ManchesterOWLSyntaxOWLObjectRendererImpl - Реализация интерфейса OWLObjectRenderer. (Отображает выражения и аксиомы классов автономного класса в манчестерском синтаксисе).
        // https://www.w3.org/TR/owl2-manchester-syntax/
        ManchesterOWLSyntaxOWLObjectRendererImpl rend = new ManchesterOWLSyntaxOWLObjectRendererImpl();

        String classId = getId(owlClass);

        return equivalentAxioms
                .stream()
                .map(rend::render)
                .map((text) -> {
                    text = text.replaceFirst(classId + " ", "");
                    text = text.replaceFirst("EquivalentTo ", "");
                    return text;
                })
                .toList();
    }

    @Override
    public String getId(@NonNull OWLEntity owlEntity) {
        return owlEntity
                .getIRI()
                .getShortForm();
    }


    /**
     * Получение класса из онтологии по короткому IRI
     *
     * @param classId  - короткое IRI
     * @param ontology - онтология
     * @return - обьект класса OWLClass
     * @throws ServiceNotFoundException - если класс с таким коротким IRI не найден
     */
    private OWLClass getClassByClassId(@NonNull String classId, @NonNull OWLOntology ontology) {
        return ontology
                .getClassesInSignature()
                .stream()
                .filter(owlClass1 -> getId(owlClass1).equals(classId))
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("owlClass = " + classId));
    }

    @Override
    public OWLClassDTO getClassInfoByClassId(@NonNull String classId, @NonNull OWLOntology ontology) {

        OWLClass owlClass = getClassByClassId(classId, ontology);

        return new OWLClassDTOBuilder()
                .setId(getId(owlClass))
                .setEntityAnnotations(getEntityAnnotations(owlClass, ontology))
                .setEquivalentAxioms(getEquivalentAxioms(owlClass, ontology))
                .setIndividualsIds(getClassIndividualsIds(owlClass, ontology, false))
                .setParentsIds(getClassParentsIds(owlClass, ontology))
                .setChildrenIds(getClassChildrenIds(owlClass, ontology))
                .createOWLClassDTO();
    }

    private List<String> getIndividualClasses(@NonNull OWLNamedIndividual owlNamedIndividual, @NonNull OWLOntology ontology) {
        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        List<String> typesIds = reasoner
                .getTypes(owlNamedIndividual)
                .getFlattened()
                .stream()
                .filter(owlClass -> !owlClass.isOWLThing())
                .map(this::getId)
                .sorted()
                .toList();

        reasoner.dispose();

        return typesIds;
    }

    private Map<String, List<String>> getIndividualPropertiesIdsWithValuesIdsByIndividual(@NonNull OWLNamedIndividual owlNamedIndividual, @NonNull OWLOntology ontology) {

        Map<String, List<String>> individualObjectPropertiesIdsWithValuesIds = new HashMap<>();

        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        Set<OWLObjectProperty> owlObjectProperties = ontology.getObjectPropertiesInSignature();

        for (OWLObjectProperty property : owlObjectProperties) {
            String propertyId = getId(property.getNamedProperty());

            List<String> individualIdListFromProperty = reasoner
                    .getObjectPropertyValues(owlNamedIndividual, property)
                    .getFlattened()
                    .stream()
                    .map(this::getId)
                    .toList();


            individualObjectPropertiesIdsWithValuesIds.put(propertyId, individualIdListFromProperty);

        }

        reasoner.dispose();
        return individualObjectPropertiesIdsWithValuesIds;
    }

    @Override
    public OWLIndividualDTO getIndividualInfoByIndividualId(@NonNull String individualId, @NonNull OWLOntology ontology) {

        OWLNamedIndividual owlNamedIndividual = ontology
                .getIndividualsInSignature()
                .stream()
                .filter(owlNamedIndividual1 -> getId(owlNamedIndividual1).equals(individualId))
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("owlNamedIndividual = " + individualId));


        return new OWLIndividualDTOBuilder()
                .setId(individualId)
                .setObjectPropertiesIdsWithValuesIds(getIndividualPropertiesIdsWithValuesIdsByIndividual(owlNamedIndividual, ontology))
                .setClassesIds(getIndividualClasses(owlNamedIndividual, ontology))
                .createOWLIndividualDTO();
    }

    @Override
    public List<OWLObjectPropertyDTO> getAllObjectPropertiesIdsWithAllValuesByDomainId(@NonNull OWLOntology ontology, String domainId) {
        List<OWLObjectProperty> objProperties = ontology
                .getObjectPropertiesInSignature()
                .stream()
                .filter((property) -> ontology
                        .getObjectPropertyDomainAxioms(property)
                        .stream()
                        .map(HasDomain::getDomain)
                        .map(AsOWLClass::asOWLClass)
                        .map(this::getId)
                        .toList()
                        .contains(domainId))
                .toList();

        return objProperties
                .stream()
                .filter((objProperty) -> !objProperty.isOWLTopObjectProperty())
                .map((property) -> new OWLObjectPropertyDTOBuilder()
                        .setId(getId(property))
                        .setIndividualsIds(ontology
                                .getObjectPropertyRangeAxioms(property)
                                .stream()
                                .map(HasRange::getRange)
                                .map(AsOWLClass::asOWLClass)
                                .map((owlClass) -> this.getClassIndividualsIds(owlClass, ontology, false))
                                .flatMap(Collection::stream)
                                .toList())
                        .createOWLObjectPropertyDTO())
                .toList();
    }

    @Override
    public List<OWLDataPropertyDTO> getAllDataPropertiesIdsWithTypeByDomainID(@NonNull OWLOntology ontology, String domainId) throws FileNotFoundException, ParseException {
        // Получение всех атрибутов онтологии
        Set<OWLDataProperty> dataProperties = ontology.getDataPropertiesInSignature();

        // Получение атрибутов только для обучающихся
        List<OWLDataProperty> learnerDataProperties = dataProperties
                .stream()
                .filter((dataProperty) -> !dataProperty.isOWLTopDataProperty())
                .filter((dataProperty) -> ontology
                        .getDataPropertyDomainAxioms(dataProperty)
                        .stream()
                        .map(HasDomain::getDomain)
                        .map(AsOWLClass::asOWLClass)
                        .map(this::getId)
                        .toList()
                        .contains(domainId))
                .toList();

        // Преобразовывание атрибутов в dto
        return learnerDataProperties
                .stream()
                .map((dataProperty) -> {
                    // Определение типа атрибута
                    String type = "";

                    // Получение рангов атрибута
                    List<OWLDataPropertyRangeAxiom> dataPropertyRanges = ontology
                            .getDataPropertyRangeAxioms(dataProperty)
                            .stream()
                            .toList();


                    if (!dataPropertyRanges.isEmpty()) {
                        // Используется первый тип
                        OWLDatatype owlDatatype = dataPropertyRanges
                                .get(0)
                                .getRange()
                                .asOWLDatatype();

                        type = getId(owlDatatype);
                    }

                    return new OWLDataPropertyDTOBuilder()
                            .setId(getId(dataProperty))
                            .setType(type)
                            .createOWLDataPropertyDTO();
                })
                .toList();
    }

    private List<OWLOntologyChange> createAnnotations(Map<String, String> annotations, IRI annotationSubject, OWLOntology ontology) {

        List<OWLAnnotation> owlAnnotations = new ArrayList<>();

        if (annotations.containsKey("comment")) {
            owlAnnotations.add(dataFactory.getRDFSComment(annotations.get("comment")));
        }

        if (annotations.containsKey("label")) {
            owlAnnotations.add(dataFactory.getRDFSLabel(annotations.get("label")));
        }

        List<OWLOntologyChange> annotationChanges = new ArrayList<>();

        owlAnnotations.forEach((annotation) -> {
            AddAxiom addAnnotationAxiom = new AddAxiom(ontology, dataFactory.getOWLAnnotationAssertionAxiom(annotationSubject, annotation));
            annotationChanges.add(addAnnotationAxiom);
        });

        return annotationChanges;
    }

    private List<OWLOntologyChange> deleteAllAnnotations(IRI annotationSubject, OWLOntology ontology) {

        List<OWLAnnotationAssertionAxiom> assertionAxioms = ontology
                .getAnnotationAssertionAxioms(annotationSubject)
                .stream()
                .filter((annotationAssertionAxiom) -> {
                    OWLAnnotationProperty annotationProperty = annotationAssertionAxiom
                            .getAnnotation()
                            .getProperty();

                    return annotationProperty.isComment() ||
                            annotationProperty.isLabel();
                })
                .toList();

        List<OWLOntologyChange> annotationChanges = new ArrayList<>();

        assertionAxioms.forEach((annotationAssertionAxiom) -> {
            RemoveAxiom addAnnotationAxiom = new RemoveAxiom(ontology, annotationAssertionAxiom);
            annotationChanges.add(addAnnotationAxiom);
        });

        return annotationChanges;
    }

    private OWLOntologyChange createParent(OWLClass parentClass, OWLClass childClass, OWLOntology ontology) {
        OWLAxiom axiom = dataFactory.getOWLSubClassOfAxiom(childClass, parentClass);
        return new AddAxiom(ontology, axiom);
    }

    private BidirectionalShortFormProvider getShortFormProvider(OWLOntology ontology) {
        // используется для создания коротких имен на основе IRI фрагментов
        ShortFormProvider shortFormProvider = new SimpleShortFormProvider();
        // предоставляет механизмы для двунаправленного преобразования между IRI и короткими формами
        return new BidirectionalShortFormProviderAdapter(ontologyManager, ontology.getImportsClosure(), shortFormProvider);
    }


    private List<OWLOntologyChange> createEquivalentAxioms(OWLClass owlClass, List<String> equivalentAxiomsStrings, OWLOntology ontology) {

        List<OWLOntologyChange> equivalentAxiomsChanges = new ArrayList<>();

        // Инициализация парсера
        ManchesterOWLSyntaxParser parser = OWLManager.createManchesterParser();
        parser.setDefaultOntology(ontology);

        // Создание ShortFormEntityChecker
        // используется для поиска сущностей в онтологии по коротким именам, предоставленным через ShortFormProvider
        ShortFormEntityChecker entityChecker = new ShortFormEntityChecker(getShortFormProvider(ontology));
        parser.setOWLEntityChecker(entityChecker);

        equivalentAxiomsStrings
                .stream()
                .map((equivalentAxiomString) -> getId(owlClass) + " EquivalentTo: " + equivalentAxiomString)
                .forEach((equivalentAxiomString) -> {
                    parser.setStringToParse(equivalentAxiomString);
                    // Парсинг и добавление изменения в список изменений
                    OWLAxiom axiom = parser.parseAxiom();
                    AddAxiom addEquivalentAxiom = new AddAxiom(ontology, axiom);
                    equivalentAxiomsChanges.add(addEquivalentAxiom);
                });

        return equivalentAxiomsChanges;
    }

    private List<OWLOntologyChange> deleteAllEquivalentAxioms(OWLClass owlClass, OWLOntology ontology) {

        List<OWLOntologyChange> annotationChanges = new ArrayList<>();

        ontology.getEquivalentClassesAxioms(owlClass)
                .forEach((equivalentClassesAxiom) -> {
                    RemoveAxiom addAnnotationAxiom = new RemoveAxiom(ontology, equivalentClassesAxiom);
                    annotationChanges.add(addAnnotationAxiom);
                });

        return annotationChanges;
    }

    @Override
    public boolean checkExistClassByClassId(String classId, OWLOntology ontology) {
        return ontology
                .getClassesInSignature()
                .stream()
                .anyMatch(owlClass -> getId(owlClass).equals(classId));

    }

    @Override
    public boolean checkExistIndividualByIndividualId(String individualId, OWLOntology ontology) {
        return ontology
                .getIndividualsInSignature()
                .stream()
                .anyMatch(owlNamedIndividual -> getId(owlNamedIndividual).equals(individualId));

    }

    @Override
    public void checkOntology(OWLOntology ontology) {
        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);

        String error = "";


        if (reasoner.isConsistent()) {
            if (reasoner.getUnsatisfiableClasses()
                        .getEntitiesMinusBottom()
                        .size() > 0) {
                error = "Онтология НЕ ПРОШЛА проверку на выполнимость";
            } else {
                OWLClass lcForm = getClassByClassId("LC_Form", ontology);
                List<String> individualsIds = getClassIndividualsIds(lcForm, ontology, true);
                if (individualsIds.size() != 0) {
                    error = "Онтология НЕ ПРОШЛА тест LC_Form. Найдены экземпляры, не относящиеся ни к одному подклассу LC_Form: " + String.join(", ", individualsIds);
                }
            }
        } else {
            error = "Онтология НЕ ПРОШЛА проверку на непротиворечивость";
        }

        reasoner.dispose();

        if (!error.equals("")) throw new RuntimeException(error);
    }

    /**
     * Генерирует список предстоящии изменений, связанных с удалением класса
     *
     * @param classId  - короткое IRI класса
     * @param ontology - онтология, в которой происходит удаление
     * @return список изменений
     * @throws ServiceNotFoundException - если класс с таким коротким IRI не найден
     */
    @Override
    public List<? extends OWLOntologyChange> deleteClassChanges(String classId, OWLOntology ontology) {
        OWLEntityRemover remover = new OWLEntityRemover(ontology);

        OWLClass owlClass = getClassByClassId(classId, ontology);
        remover.visit(owlClass);

        return remover.getChanges();
    }

    @Override
    public List<? extends OWLOntologyChange> createClassChanges(SavingClassDTO classDTO, OWLOntology ontology) {
        try {

            List<OWLOntologyChange> changes = new ArrayList<>();

            IRI ontologyIRI = ontology.getOntologyID()
                                      .getOntologyIRI()
                                      .orElseThrow(() -> new ServiceNotFoundException("Онтология не найдена"));

            // Создаем новый класс
            IRI newClassIRI = IRI.create(ontologyIRI + "#" + classDTO.getId());
            OWLClass newClass = dataFactory.getOWLClass(newClassIRI);
            ontologyManager.addAxiom(ontology, dataFactory.getOWLDeclarationAxiom(newClass));

            // Создаем аксиому подкласса
            OWLClass parentClass = getClassByClassId(classDTO.getParentId(), ontology);
            changes.add(createParent(parentClass, newClass, ontology));


            // Создаем аннотации
            changes.addAll(createAnnotations(classDTO.getAnnotations(), newClassIRI, ontology));


            // Создаем аксиомы эквивалентности
            changes.addAll(createEquivalentAxioms(newClass, classDTO.getEquivalentAxioms(), ontology));

            return changes;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<? extends OWLOntologyChange> updateIndividualChanges(SavingIndividualDTO individualDTO, OWLOntology ontology) {
        try {

            List<OWLOntologyChange> changes = new ArrayList<>();

            OWLNamedIndividual owlNamedIndividual = getIndividualByIndividualId(individualDTO.getId(), ontology);

            // Изменяем обьектные свойства
            changes.addAll(deleteAllObjectProperties(owlNamedIndividual, ontology));
            changes.addAll(createObjectProperties(owlNamedIndividual, individualDTO.getObjectPropertiesIdsWithValuesIds(), ontology));

            return changes;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private Collection<? extends OWLOntologyChange> deleteAllObjectProperties(OWLNamedIndividual owlNamedIndividual, OWLOntology ontology) {
        Set<OWLObjectPropertyAssertionAxiom> assertionAxioms = ontology.getObjectPropertyAssertionAxioms(owlNamedIndividual);

        List<OWLOntologyChange> objectPropertiesChanges = new ArrayList<>();

        assertionAxioms.forEach((objectPropertyAssertionAxiom) -> {
            RemoveAxiom removeObjectPropertyAxiom = new RemoveAxiom(ontology, objectPropertyAssertionAxiom);
            objectPropertiesChanges.add(removeObjectPropertyAxiom);
        });

        return objectPropertiesChanges;
    }

    private List<OWLOntologyChange> createObjectProperties(OWLNamedIndividual individual, Map<String, List<String>> objectPropertiesIdsWithValuesIds, OWLOntology ontology) {

        List<OWLOntologyChange> objectPropertiesChanges = new ArrayList<>();

        objectPropertiesIdsWithValuesIds.forEach((objectPropertyId, values) -> {
                    OWLObjectProperty objectProperty = getObjectPropertyByObjectPropertyId(objectPropertyId, ontology);

                    values.stream()
                          .map((value) -> getIndividualByIndividualId(value, ontology))
                          .forEach((individualFromValue) -> {
                              OWLObjectPropertyAssertionAxiom objectPropertyAssertionAxiom = dataFactory.getOWLObjectPropertyAssertionAxiom(objectProperty, individual, individualFromValue);
                              AddAxiom addObjectPropertyAxiom = new AddAxiom(ontology, objectPropertyAssertionAxiom);
                              objectPropertiesChanges.add(addObjectPropertyAxiom);
                          });
                }
        );

        return objectPropertiesChanges;
    }

    @Override
    public List<? extends OWLOntologyChange> createIndividualChanges(SavingIndividualDTO individualDTO, OWLOntology ontology) {
        try {
            List<OWLOntologyChange> changes = new ArrayList<>();

            IRI ontologyIRI = ontology
                    .getOntologyID()
                    .getOntologyIRI()
                    .orElseThrow(() -> new ServiceNotFoundException("Онтология не найдена"));

            // Создаем новый экземпляр
            IRI newIndividualIRI = IRI.create(ontologyIRI + "#" + individualDTO.getId());
            OWLNamedIndividual newIndividual = dataFactory.getOWLNamedIndividual(newIndividualIRI);
            changes.add(new AddAxiom(ontology, dataFactory.getOWLDeclarationAxiom(newIndividual)));

            changes.add(new AddAxiom(ontology, dataFactory.getOWLClassAssertionAxiom(getClassByClassId("LC_Form", ontology), newIndividual)));

            // Задаем обьектные свойства
            changes.addAll(createObjectProperties(newIndividual, individualDTO.getObjectPropertiesIdsWithValuesIds(), ontology));

            return changes;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<? extends OWLOntologyChange> deleteIndividualChanges(String individualId, OWLOntology ontology) {
        OWLEntityRemover remover = new OWLEntityRemover(ontology);

        OWLNamedIndividual owlIndividual = getIndividualByIndividualId(individualId, ontology);
        remover.visit(owlIndividual);

        return remover.getChanges();
    }

    @Override
    public OWLOntology getLCOntology() {
        return SingleLCOntology.getOntology(this.ontologyManager);
    }

    @Override
    public OWLLearningContentResultDTO getContentByStudentParameters(OWLOntology ontology, StudentParametersDTO studentParametersDTO) {
        try {
            List<OWLOntologyChange> changes = new ArrayList<>();

            IRI ontologyIRI = ontology
                    .getOntologyID()
                    .getOntologyIRI()
                    .orElseThrow(() -> new ServiceNotFoundException("Онтология не найдена"));

            // Создаем студента / группу студентов
            IRI newStudentIRI = IRI.create(ontologyIRI + "#" + "student");
            OWLNamedIndividual newStudent = dataFactory.getOWLNamedIndividual(newStudentIRI);
            changes.add(new AddAxiom(ontology, dataFactory.getOWLDeclarationAxiom(newStudent)));
            changes.add(new AddAxiom(ontology, dataFactory.getOWLClassAssertionAxiom(getClassByClassId("LearnerID", ontology), newStudent)));

            // Задаем параметры студента / группы студентов
            changes.addAll(createDataProperties(newStudent, studentParametersDTO.getDataPropertiesIdsWithValue(), ontology));

            // Создаем копию онтологии
            OWLOntology ontology1 = OWLManager.createConcurrentOWLOntologyManager()
                                              .copyOntology(ontology, OntologyCopy.DEEP);

            ontology1.applyChanges(changes); // Применяем изменения к копии
            //ontology1.saveOntology();
            //checkOntology(ontology1);    // Проверяем выполнение ризонера

            // Запускаем ризонер для определения присвоилось ли свойство "isRecommended" к созданному экземпляру

            Map<String, List<String>> objectProperties = getIndividualPropertiesIdsWithValuesIdsByIndividual(this.getIndividualByIndividualId("student", ontology1), ontology1);

            List<String> LCindividuals = objectProperties.get("isRecommended");

            return new OWLLearningContentResultDTOBuilder()
                    .setIndividualsIds(LCindividuals)
                    .createOWLLearningContentResultDTO();


        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private Collection<? extends OWLOntologyChange> createDataProperties(OWLNamedIndividual individual,
                                                                         Map<String, DataPropertyDTO> dataPropertiesIdsWithValue,
                                                                         OWLOntology ontology) {

        List<OWLOntologyChange> dataPropertiesChanges = new ArrayList<>();

        dataPropertiesIdsWithValue.forEach((dataPropertyId, dataPropertyDTO) -> {
                    OWLDataProperty dataProperty = getDataPropertyByDataPropertyId(dataPropertyId, ontology);

                    OWLDataPropertyAssertionAxiom dataPropertyAssertionAxiom = converterDataProperty.getOWLDataPropertyAssertionAxiom(dataProperty, individual, dataPropertyDTO);
                    AddAxiom addObjectPropertyAxiom = new AddAxiom(ontology, dataPropertyAssertionAxiom);
                    dataPropertiesChanges.add(addObjectPropertyAxiom);
                }
        );

        return dataPropertiesChanges;

    }

    private OWLDataProperty getDataPropertyByDataPropertyId(String dataPropertyId, OWLOntology ontology) {

        return ontology
                .getDataPropertiesInSignature()
                .stream()
                .filter(owlDataProperty -> getId(owlDataProperty).equals(dataPropertyId))
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("owlDataProperty = " + dataPropertyId));
    }

    @Override
    public List<OWLDataPropertyDTO> getContentExplanations(OWLOntology ontology) {
//        OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);
//
//        IRI ontologyIRI = ontology.getOntologyID()
//                                  .getOntologyIRI()
//                                  .orElseThrow(() -> new ServiceNotFoundException("Онтология не найдена"));
//
//        OWLNamedIndividual studentIndividual = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLNamedIndividual(ontologyIRI + "#" +"Student"));
//
//
//
//        // Присваивание атрибутов
//        OWLDataProperty hasProperty = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataProperty(IRI.create("http://example.org#hasProperty"));
//        Set<OWLLiteral> properties = new HashSet<>();
//        properties.add(ontology.getOWLOntologyManager().getOWLDataFactory().getOWLLiteral("property1"));
//        properties.add(ontology.getOWLOntologyManager().getOWLDataFactory().getOWLLiteral("property2"));
//
//        // Присваивание свойств экземпляру "Саша"
//        for (OWLLiteral property : properties) {
//            ontologyManager.addAxiom(ontology, ontology.getOWLOntologyManager().getOWLDataFactory().getOWLDataPropertyAssertionAxiom(hasProperty, sasha, property));
//        }
//
//        // Добавление свойства "рекомендуется" и привязка к экземплярам и подклассам класса "Контент"
//        OWLObjectProperty recommendedContent = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectProperty(IRI.create("http://example.org#recommendedContent"));
//        OWLClass contentClass = ontology.getOWLOntologyManager().getOWLDataFactory().getOWLClass(IRI.create("http://example.org#Content"));
//        Set<OWLNamedIndividual> contentObjects = reasoner.getInstances(contentClass, false).getFlattened();
//        for (OWLNamedIndividual contentObject : contentObjects) {
//            ontologyManager.addAxiom(ontology, ontology.getOWLOntologyManager().getOWLDataFactory().getOWLObjectPropertyAssertionAxiom(recommendedContent, sasha, contentObject));
//        }
//
//        Supplier<OWLOntologyManager> managerSupplier = () -> ontologyManager;
//
//        // Получение объяснений к свойствам "рекомендуется"
//        ExplanationGeneratorFactory<OWLAxiom> explanationGeneratorFactory = new DefaultExplanationGeneratorFactory(reasonerFactory);
//        ExplanationGeneratorFactory<OWLAxiom> factory = new LaconicExplanationGeneratorFactory(managerSupplier);
//        ExplanationGenerator<OWLAxiom> generator = factory.createExplanationGenerator(ontology);
//
//        // Получение аксиом, описывающих свойства "рекомендуется" экземпляра "Саша"
//        Set<OWLAxiom> assertionAxioms = studentIndividual.getReferencingAxioms(ontology);
//
//        // Получение объяснений
//        Set<Explanation<OWLAxiom>> explanations = generator.getExplanations(assertionAxioms, ExplanationType.DERIVED);
//
//        // Вывод объяснений
//        for (Explanation<OWLAxiom> explanation : explanations) {
//            System.out.println("Explanation:");
//            for (OWLAxiom axiom : explanation.getAxioms()) {
//                System.out.println(axiom);
//            }
//        }
//
//        // Освобождение ресурсов
//        reasoner.dispose();
        // PelletExplanation explanationGenerator = new PelletExplanation(reasoner);

        // ManchesterSyntaxExplanationRenderer renderer = new ManchesterSyntaxExplanationRenderer();
        // PrintWriter out = new PrintWriter(System.out);
        // renderer.startRendering(out);

        // OWLIndividual angle = dataFactory.getOWLNamedIndividual(IRI.create(NS + "angle_C"));
        // OWLDataPropertyExpression hasAngle = dataFactory.getOWLDataProperty(IRI.create(NS + "has_angle_of"));

        // OWLAxiom axiom = dataFactory.getOWLDataPropertyAssertionAxiom(hasAngle, angle, 105);
        // System.out.println(axiom);
        // System.out.println(ontology.getAxioms(AxiomType.SWRL_RULE));

        //  Set<Set<OWLAxiom>> explanations = explanationGenerator.getEntailmentExplanations(axiom);

        //  renderer.render(explanations);
        //  renderer.endRendering();
        return null;
    }

    private OWLNamedIndividual getIndividualByIndividualId(String individualId, OWLOntology ontology) {
        return ontology
                .getIndividualsInSignature()
                .stream()
                .filter(owlNamedIndividual -> getId(owlNamedIndividual).equals(individualId))
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("owlNamedIndividual = " + individualId));
    }

    private OWLObjectProperty getObjectPropertyByObjectPropertyId(String objectPropertyId, OWLOntology ontology) {
        return ontology
                .getObjectPropertiesInSignature()
                .stream()
                .filter(owlObjectProperty -> getId(owlObjectProperty).equals(objectPropertyId))
                .findFirst()
                .orElseThrow(() -> new ServiceNotFoundException("owlObjectProperty = " + objectPropertyId));
    }


    @Override
    public List<? extends OWLOntologyChange> updateClassChanges(SavingClassDTO classDTO, OWLOntology ontology) {
        try {

            List<OWLOntologyChange> changes = new ArrayList<>();

            OWLClass owlClass = getClassByClassId(classDTO.getId(), ontology);

            // Изменяем аннотации
            changes.addAll(deleteAllAnnotations(owlClass.getIRI(), ontology));
            changes.addAll(createAnnotations(classDTO.getAnnotations(), owlClass.getIRI(), ontology));


            // Изменяем аксиомы эквивалентности
            changes.addAll(deleteAllEquivalentAxioms(owlClass, ontology));
            changes.addAll(createEquivalentAxioms(owlClass, classDTO.getEquivalentAxioms(), ontology));

            return changes;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public synchronized void saveOntology(List<? extends OWLOntologyChange> ontologyChanges, OWLOntology ontology) {
        try {
            // создаем копию онтологии
            OWLOntology ontology1 = OWLManager.createConcurrentOWLOntologyManager()
                                              .copyOntology(ontology, OntologyCopy.DEEP);
            // применяем изменения к копии
            System.out.println("start" + ontologyChanges.size());
            ontology1.applyChanges(ontologyChanges); // Добавляем изменения

            System.out.println("check" + ontologyChanges.size());
            checkOntology(ontology1);    // Проверяем выполнение ризонера

            // Если проверка прошла успешно, то применяем изменения к оригинальной онтологии
            System.out.println("start_2" + ontologyChanges.size());
            ontology.applyChanges(ontologyChanges); // Добавляем изменения

            System.out.println("save" + ontologyChanges.size());
            this.ontologyManager.saveOntology(ontology);    // Сохраняем онтологию
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
