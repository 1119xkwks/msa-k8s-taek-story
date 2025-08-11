# msa-k8s-taek-story

## Kubernetes Service Inventory

아래 표는 쿠버네티스 서비스 목록을 정리하기 위한 템플릿입니다.

| 서비스명 | namespace | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---:|---|
| taek-story-user |  | 80 |  | React 사용자 앱 |
| redisinsight |  | 5540 | 30102 | Redis 관리 GUI |
| redis |  | 6379 | 30101 | 세션 서버 |
| pg-db-user |  | 15432 | 31001 | 사용자 계정 DB |
| pg-db-posting |  | 15433 | 31002 | post/comment DB |
| ingress-nginx-controller-nodeport | ingress-nginx | 32080 |  | :32080 → :90 |
| taek-story-ingress |  | 90 |  | url 라우팅 |
| user-service |  | 90 | 32090 | spring cloud |
| dev-proxy |  | 80 | 32290 | 개발 pc 프록시 |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

