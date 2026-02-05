
$images = @{
    "Board_on_Board_Fence.jpg" = "privacy-fence-installation-fayetteville-nc.jpg";
    "down-net_http20241126-79-v1blet.jpg" = "custom-deck-construction-fayetteville.jpg";
    "paneldoor.jpeg" = "secure-entry-door-installation.jpg";
    "e6aca2_5dca41a5bd8a48a1902ad71368714bac_mv2.jpeg" = "rwf-home-improvements-team.jpeg";
    "logo.png" = "rwf-home-improvements-logo-fayetteville.png";
}

$baseDir = "public/images"

foreach ($old in $images.Keys) {
    $new = $images[$old]
    $oldPath = Join-Path $baseDir $old
    $newPath = Join-Path $baseDir $new
    
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $new -Force
        Write-Host "Renamed $old to $new"
    } else {
        Write-Host "File not found: $oldPath"
    }
}

# Subdirectory images
$subImages = @{
    "home/wooden-gate-designs-that-last-the-test-of-time.jpg" = "home/custom-wooden-gate-fencing.jpg";
    "pages/window-installation/bright-room.jpg" = "pages/window-installation/energy-efficient-window-replacement.jpg";
}

foreach ($oldKey in $subImages.Keys) {
    $parts = $oldKey -split "/"
    $fileName = $parts[-1]
    $subDir = $parts[0..($parts.Length-2)] -join "/"
    
    $oldPath = Join-Path $baseDir $oldKey
    
    $newFileName = $subImages[$oldKey].Split("/")[-1]
    
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $newFileName -Force
        Write-Host "Renamed $oldKey to $newFileName"
    } else {
         Write-Host "File not found: $oldPath"
    }
}
