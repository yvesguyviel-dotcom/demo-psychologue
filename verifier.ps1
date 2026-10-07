param([string]$Regime = "A", [string]$Mode = "demo")
$global:ok = $true
function Check($nom, $condition) {
  if ($condition) { Write-Host ("OK     " + $nom) -ForegroundColor Green }
  else { Write-Host ("PAS OK " + $nom) -ForegroundColor Red; $global:ok = $false }
}
$dist = if (Test-Path "dist\client") { "dist\client" } else { "dist" }

$mots = "gratuit|optimal|garanti|meilleur|premier sur google|rembours|s.{1,2}curit.{1,2} sociale|t.{1,2}moignage|retrouvez|restaurer|traiter la cause|remplissent votre agenda"
if ($Regime -eq "B") { $mots = $mots + "|patient|consultation|soigner|gu.{1,2}rir|gu.{1,2}rison|th.{1,2}rapeutique|soulager|diagnostic" }
if ($Regime -eq "P") { $mots = $mots + "|mutuelle|psychoth.{1,2}rapeute|gu.{1,2}rir|gu.{1,2}rison|soigner|traitement|clinicienne" }
$trouves = git --no-pager grep -n -i -E $mots -- src
$trouves = @($trouves | Where-Object { $_ -notmatch "3114" })
Check "Mots a eviter absents de src" (-not $trouves)
if ($trouves) { $trouves | Select-Object -First 15 }

Check "Le site construit existe (lance pnpm build)" (Test-Path "$dist\index.html")

if ($Mode -eq "demo") {
  $pages = @(Get-ChildItem $dist -Recurse -Filter index.html)
  $sans = @($pages | Where-Object { (Get-Content $_.FullName -Raw) -notmatch 'content="noindex' })
  Check ("noindex sur les " + $pages.Count + " pages") (($pages.Count -gt 0) -and ($sans.Count -eq 0))
  $robots = if (Test-Path "$dist\robots.txt") { Get-Content "$dist\robots.txt" -Raw } else { "" }
  Check "robots.txt contient Disallow: /" ($robots -match "Disallow:\s*/")
  Check "Pas de sitemap ni de llms.txt" (-not (Get-ChildItem $dist -Recurse -Include "sitemap*.xml","llms.txt"))
}
if ($Mode -eq "client") {
  $pages = @(Get-ChildItem $dist -Recurse -Filter index.html)
  $avec = @($pages | Where-Object { (Get-Content $_.FullName -Raw) -match 'content="noindex' })
  Check "Aucune page en noindex" ($avec.Count -eq 0)
  Check "sitemap present" (Test-Path "$dist\sitemap*.xml")
  Check "Plus d'adresse example.com dans l'accueil" (-not (Select-String -Path "$dist\index.html" -Pattern "example\.com" -Quiet))
}
Write-Host ""
if ($global:ok) { Write-Host "RESULTAT : OK" -ForegroundColor Green } else { Write-Host "RESULTAT : PAS OK" -ForegroundColor Red }
