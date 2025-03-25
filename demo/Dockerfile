FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace/app

COPY . /workspace/app
RUN ./gradlew clean build -x test
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*-SNAPSHOT.jar)

FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/dependency
WORKDIR /app
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /build/lib
COPY --from=build ${DEPENDENCY}/META-INF /build/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /build/classes
ENTRYPOINT ["java","-cp","/build/classes:/build/lib/*","com.example.demo.DemoApplication"]