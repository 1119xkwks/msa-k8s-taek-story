$ErrorActionPreference = "Stop"

# 최신 이미지로 강제 롤링 업데이트 예시
#   kubectl rollout restart deploy/taek-store-user
#   kubectl rollout status  deploy/taek-store-user

function Restart-And-Wait {
    param (
        [Parameter(Mandatory=$true)]
        [string]$DeploymentName
    )

    Write-Host "==== 롤링 재배포 시작: $DeploymentName ====" -ForegroundColor Cyan

    kubectl rollout restart deploy/$DeploymentName
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 재시작 실패: $DeploymentName" -ForegroundColor Red
        exit 1
    }

    kubectl rollout status deploy/$DeploymentName
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 상태 확인 실패: $DeploymentName" -ForegroundColor Red
        exit 1
    }

    Write-Host "✅ 완료: $DeploymentName" -ForegroundColor Green
}

$deployments = @(
    # Frontend
    "taek-store-user",

    # Backends (4)
    "file-service",
    "posting-service-deploy",
    "user-service-deploy",
    "notification-service-deploy"
)

foreach ($d in $deployments) {
    Restart-And-Wait -DeploymentName $d
}

Write-Host "✅ 모든 롤링 재배포 완료" -ForegroundColor Yellow


