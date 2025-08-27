<#
.SYNOPSIS
    삭제되지 않은, 사용하지 않는 ReplicaSet 정리 스크립트

.DESCRIPTION
    DESIRED, CURRENT, READY 값이 모두 0이거나 null인 ReplicaSet을 찾아 삭제합니다.
    모든 네임스페이스를 검사하며, 삭제 전 삭제할 ReplicaSet 이름을 출력합니다.

.NOTES
    작성자: 사용자
    실행환경: Windows 11 PowerShell
    주의사항: 스크립트 실행 전, PowerShell 실행 정책이 RemoteSigned 이상이어야 합니다.
#>

Write-Host "Starting cleanup of unused ReplicaSets..." -ForegroundColor Cyan

kubectl get rs --all-namespaces -o json `
| ConvertFrom-Json `
| Select-Object -ExpandProperty items `
| Where-Object {
    ($_.status.replicas -eq $null -or $_.status.replicas -eq 0) -and
    ($_.status.readyReplicas -eq $null -or $_.status.readyReplicas -eq 0) -and
    ($_.status.availableReplicas -eq $null -or $_.status.availableReplicas -eq 0)
} `
| ForEach-Object {
    Write-Host "Deleting ReplicaSet:" $_.metadata.name -ForegroundColor Yellow
    kubectl delete rs $_.metadata.name --namespace $_.metadata.namespace
}

Write-Host "`n==== Cleanup complete! ====" -ForegroundColor Green
Pause
