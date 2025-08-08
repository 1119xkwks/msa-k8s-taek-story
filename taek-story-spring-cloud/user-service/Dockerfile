FROM openjdk:21-ea-slim
VOLUME /tmp
COPY build/libs/user-service-0.1.jar UserService.jar
ENTRYPOINT ["java", "-jar", "UserService.jar", "--spring.profiles.active=k8s"]
