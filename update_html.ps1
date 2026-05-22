$content = Get-Content "index.html" -Raw
$scriptStart = $content.IndexOf("<script>")
$scriptEnd = $content.IndexOf("</script>") + 9

if ($scriptStart -ge 0 -and $scriptEnd -gt $scriptStart) {
    $beforeScript = $content.Substring(0, $scriptStart)
    $afterScript = $content.Substring($scriptEnd)
    
    $lightbox = @'
    <!-- Lightbox Modal -->
    <div class="lightbox" id="lightbox">
        <span class="lightbox-close" id="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Full size image">
    </div>
'@
    
    $newContent = $beforeScript + $lightbox + $afterScript
    $newContent | Set-Content "index.html" -NoNewline
    Write-Host "Successfully replaced script with lightbox HTML"
} else {
    Write-Host "Script tag not found"
}
