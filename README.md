# msa-k8s-taek-story

## Kubernetes Service Inventory

아래 표는 쿠버네티스 서비스 목록을 정리하기 위한 템플릿입니다.

| 서비스명 | 서비스 포트 | 노드 포트 | 메모 |
|---|---:|---:|---|
| taek-story-user | 80 |  | React 사용자 앱 |
| redisinsight | 5540 | 30102 | Redis 관리 GUI |
| redis | 6379 | 30101 | 세션 서버 |
| pg-db-user | 15432 | 31001 | 사용자 계정 DB |
| pg-db-posting | 15433 | 31002 | post/comment DB |
|  |  |  |  |
|  |  |  |  |

메모
- 노드포트가 없으면 빈 칸으로 둡니다.
- 여러 포트를 사용하는 서비스는 행을 나눠 각각 기록합니다.
- 인그레스 사용 시 인그레스 리소스와 도메인도 별도 섹션에 기록하세요.