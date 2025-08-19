FROM openjdk:21-ea-slim
VOLUME /tmp
COPY build/libs/posting-service-0.1.jar PostingService.jar
ENTRYPOINT ["java", "-jar", "PostingService.jar", "--spring.profiles.active=k8s"]
