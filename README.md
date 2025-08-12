# msa-k8s-taek-story

## 라우팅

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| ingress-nginx-controller-nodeport | ingress-nginx | 32080 |  | :32080 → :90 |
| taek-story-ingress |  | 90 |  | url 라우팅 |
| dev-proxy |  | 80 | 32290 | 개발 pc 프록시 |


## 캐쉬서버 (Redis), 파일서버 (MinIO)

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| redis |  | 6379 | 30101 | 세션 서버 |
| redisinsight |  | 5540 | 30102 | Redis 관리 GUI |
| minio-s3 |  | 9000 | 30103 | MinIO S3 API |
| minio-console |  | 9001 | 30104 | Web Console |


## Database

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| pg-db-user |  | 15432 | 31001 | userdb: 사용자/친구 계정 DB |
| pg-db-posting |  | 15433 | 31002 | postingdb: 글쓰기 DB |
| pg-db-file |  | 15434 | 31004 | filedb: 파일 정보 DB |
|  |  |  |  |  |


## Spring Cloud

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| user-service |  | 90 | 32090 | ↔ pg-db-user |
| file-service |  | 90 | 32091 | ↔ pg-db-file |
|  |  |  |  |  |
|  |  |  |  |  |


## React

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| taek-story-user |  | 80 | 30080 | React 사용자 앱 |
|  |  |  |  |  |
|  |  |  |  |  |