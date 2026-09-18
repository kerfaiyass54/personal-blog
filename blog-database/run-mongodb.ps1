param(
    [string]$Container = "blog-mongodb",
    [string]$Database = "blog_database"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$remoteRoot = "/tmp/blog-database"

docker inspect $Container *> $null
if ($LASTEXITCODE -ne 0) {
    throw "MongoDB container '$Container' was not found. Start blog-environment/docker-compose.yaml first."
}

$running = docker inspect --format "{{.State.Running}}" $Container
if ($running -ne "true") {
    throw "MongoDB container '$Container' is not running."
}

docker exec $Container rm -rf $remoteRoot
docker exec $Container mkdir -p "$remoteRoot/init" "$remoteRoot/data"

foreach ($folder in @("init", "data")) {
    $files = Get-ChildItem (Join-Path $root $folder) -Filter "*.js" | Sort-Object Name

    foreach ($file in $files) {
        $destination = "$Container`:$remoteRoot/$folder/$($file.Name)"
        docker cp $file.FullName $destination
        if ($LASTEXITCODE -ne 0) {
            throw "Could not copy $($file.FullName) to the MongoDB container."
        }
    }
}

foreach ($folder in @("init", "data")) {
    $files = Get-ChildItem (Join-Path $root $folder) -Filter "*.js" | Sort-Object Name

    foreach ($file in $files) {
        $remoteFile = "$remoteRoot/$folder/$($file.Name)"
        Write-Host "Running $folder/$($file.Name)..."
        docker exec $Container mongosh $Database --quiet --file $remoteFile
        if ($LASTEXITCODE -ne 0) {
            throw "MongoDB rejected $folder/$($file.Name)."
        }
    }
}

docker exec $Container rm -rf $remoteRoot
Write-Host "MongoDB initialization and seed data completed in '$Database'."
