FROM openjdk:21-ea-slim
VOLUME /tmp
COPY build/libs/notification-service-0.1.jar NotificationService.jar
ENTRYPOINT ["java", "-jar", "NotificationService.jar", "--spring.profiles.active=k8s"]
