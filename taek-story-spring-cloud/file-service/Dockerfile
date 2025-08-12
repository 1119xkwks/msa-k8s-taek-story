FROM openjdk:21-ea-slim
VOLUME /tmp
COPY build/libs/file-service-0.1.jar FileService.jar
ENTRYPOINT ["java", "-jar", "FileService.jar", "--spring.profiles.active=k8s"]
