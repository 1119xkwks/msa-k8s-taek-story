# msa-k8s-taek-story

## 라우팅

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| ingress-nginx-controller-nodeport | ingress-nginx | 32080 |  | :32080 → :90 |
| ingress (taek-story-ingress / minio-s3-ingress) |  | 90 |  | url 라우팅 |
| dev-proxy |  | 80 | 32290 | 개발 pc 프록시 |


## 캐쉬서버 (Redis), 파일서버 (MinIO), 메시지 브로커 서버 (kafka), 모니터링/tracing 툴

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| redis |  | 6379 | 30101 | 세션 서버 |
| redisinsight |  | 5540 | 30102 | Redis 관리 GUI |
| minio-s3 |  | 9000 | 30103 | MinIO S3 API |
| minio-console |  | 9001 | 30104 | Web Console |
| kafka KRaft |  | 9990 | 30105 | KAFKA |
| Kafka UI |  | 9991 | 30106 | Topic/Consumer 관리, 메시지 브라우징, Schema Registry 지원 |
| Tempo |  | 4317 (gRPC), 4318 (HTTP OTLP), 3200 (UI) | 30107, 30108, 30109 | tracing 저장소 |
| Grafana |  | 3000 | 30110 | tracing 시각화 |
| Prometheus |  | 9090 | 30111 | 시계열 데이터(time-series data)를 수집 |
| kube-state-metrics |  | 8080 |  | Kubernetes 리소스 메트릭 |
| node-exporter |  | 9100 |  | 노드 OS 메트릭 |


## Database

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| pg-db-user |  | 15432 | 31001 | userdb: 사용자/친구 계정 DB |
| pg-db-posting |  | 15433 | 31002 | postingdb: 글쓰기 DB |
| pg-db-file |  | 15434 | 31004 | filedb: 파일 정보 DB |
| pg-db-notification |  | 15435 | 31005 | notificationdb: 알림 관련 DB |
|  |  |  |  |  |


## Spring Cloud

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| user-service |  | 90 | 32090 | ↔ pg-db-user |
| file-service |  | 90 | 32091 | ↔ pg-db-file |
| posting-service |  | 90 | 32092 | ↔ pg-db-posting |
| notification-service |  | 90 | 32093 | ↔ pg-db-notification |
|  |  |  |  |  |


## React

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| taek-story-user |  | 80 | 30080 | React 사용자 앱 |
|  |  |  |  |  |
|  |  |  |  |  |