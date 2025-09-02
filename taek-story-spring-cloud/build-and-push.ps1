# build-and-push.ps1
# PowerShell 7.5 + Windows 11 환경용
# 각 서비스별 Docker 이미지 빌드 및 푸시 자동화

$ErrorActionPreference = "Stop"

function Build-And-Push {
    param (
        [string]$ServiceName
    )

    Write-Host "==== 빌드 시작: $ServiceName ====" -ForegroundColor Cyan
    cd $ServiceName
    ./gradlew clean build -x test

    $ImageTag = "ytkwon91/$ServiceName:0.1"
    docker build -t $ImageTag .
    docker push $ImageTag

    cd ..
    Write-Host "==== 완료: $ServiceName ====" -ForegroundColor Green
}

# 실행 순서
Build-And-Push "file-service"
Build-And-Push "notification-service"
Build-And-Push "posting-service"
Build-And-Push "user-service"

Write-Host "✅ 모든 서비스 빌드 및 푸시 완료" -ForegroundColor Yellow
