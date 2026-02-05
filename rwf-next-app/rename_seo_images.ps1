$imagesDir = "c:/Business/Kilvington Woodworks/Agentic Agents/Website scraping tool - website replicator/downloads/rwfhomeimprovements/rwf-next-app/public/images"
$renames = @{
    "Men_20with_20Calculator.jpg"      = "affordable-fence-financing-payment-plans.jpg"
    "Reviewing_20document.jpg"         = "fast-fence-financing-approval-fayetteville.jpg"
    "Dollar_20Bill_20in_20Jar.jpg"     = "transparent-fencing-pricing-no-hidden-fees.jpg"
    "Calculator.jpg"                   = "low-interest-fence-loans-nc.jpg"
    "Farm_20and_20Ranch_20Fencing.jpg" = "farm-ranch-fence-financing-nc.jpg"
}

foreach ($old in $renames.Keys) {
    $oldPath = Join-Path $imagesDir $old
    $newPath = Join-Path $imagesDir $renames[$old]
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $renames[$old]
        Write-Host "Renamed $old to $($renames[$old])"
    }
    else {
        Write-Warning "File not found: $old"
    }
}
