$ErrorActionPreference = "Stop"

function Build-And-Push {
    param (
        [Parameter(Mandatory=$true)]
        [string]$ServiceName
    )

    Write-Host "==== 빌드 시작: $ServiceName ====" -ForegroundColor Cyan

    if (-Not (Test-Path $ServiceName)) {
        Write-Host "❌ 서비스 폴더가 존재하지 않습니다: $ServiceName" -ForegroundColor Red
        exit 1
    }

    Push-Location $ServiceName

    # Gradle 빌드
    ./gradlew clean build -x test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Gradle 빌드 실패" -ForegroundColor Red
        Pop-Location
        exit 1
    }

    # Docker 이미지 태그
    $HubVersion = "0.1"
    $ImageTag = "ytkwon91/$ServiceName`:$HubVersion"
    Write-Host "빌드된 Docker 이미지 태그: '$ImageTag'" -ForegroundColor Yellow

    # Docker 빌드 & 푸시
    docker build -t $ImageTag .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker 빌드 실패" -ForegroundColor Red
        Pop-Location
        exit 1
    }

    docker push $ImageTag
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker 푸시 실패" -ForegroundColor Red
        Pop-Location
        exit 1
    }

    Pop-Location
    Write-Host "==== 완료: $ServiceName ====" -ForegroundColor Green
}

# 실행 순서
$Services = @(
    "file-service",
    "notification-service",
    "posting-service",
    "user-service"
)

foreach ($svc in $Services) {
    Build-And-Push -ServiceName $svc
}

Write-Host "✅ 모든 서비스 빌드 및 푸시 완료" -ForegroundColor Yellow
