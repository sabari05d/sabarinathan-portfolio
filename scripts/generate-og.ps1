param(
  [string]$OutPath = "public\og.png"
)

Add-Type -AssemblyName System.Drawing

$W = 1200
$H = 630

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background
$bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 2, 4, 8))
$g.FillRectangle($bg, 0, 0, $W, $H)

# Cyan radial glow (top-left)
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse((-400), (-420), 1300, 1000)
$glow = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glow.CenterPoint = New-Object System.Drawing.PointF(120, 60)
$glow.CenterColor = [System.Drawing.Color]::FromArgb(60, 0, 229, 255)
$glow.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 229, 255))
$g.FillRectangle($glow, 0, 0, $W, $H)

# Emerald glow (bottom-right)
$glow2Path = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2Path.AddEllipse((700), (300), 900, 700)
$glow2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2Path)
$glow2.CenterPoint = New-Object System.Drawing.PointF(1080, 570)
$glow2.CenterColor = [System.Drawing.Color]::FromArgb(38, 0, 255, 136)
$glow2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0, 255, 136))
$g.FillRectangle($glow2, 0, 0, $W, $H)

# Subtle grid
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(16, 0, 229, 255), 1)
for ($x = 0; $x -le $W; $x += 40) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
for ($y = 0; $y -le $H; $y += 40) { $g.DrawLine($gridPen, 0, $y, $W, $y) }

# Border
$border = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 0, 229, 255), 2)
$g.DrawRectangle($border, 1, 1, $W - 2, $H - 2)

# Fonts
$nameFont = New-Object System.Drawing.Font("Segoe UI", 86, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$roleFont = New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$monoFont = New-Object System.Drawing.Font("Consolas", 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$chipFont = New-Object System.Drawing.Font("Consolas", 20, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 232, 244, 248))
$cyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 229, 255))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 138, 167, 181))
$emerald = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 255, 136))

# Prompt marker
$g.DrawString("~$", $monoFont, $cyan, 80, 118)

# Name
$g.DrawString("Sabarinathan", $nameFont, $white, 80, 165)
$nameSize = $g.MeasureString("Sabarinathan", $nameFont)
$g.DrawString("D", $nameFont, $cyan, 80 + $nameSize.Width - 6, 165)

# Role
$g.DrawString("Full Stack Developer", $roleFont, $cyan, 84, 285)
$roleSize = $g.MeasureString("Full Stack Developer", $roleFont)
$dotX = 84 + $roleSize.Width + 26
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 138, 167, 181))
$g.FillEllipse($dotBrush, $dotX, 300, 9, 9)
$g.DrawString("System Architect", $roleFont, $muted, $dotX + 26, 285)

# Underline
$line = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 0, 229, 255), 3)
$g.DrawLine($line, 84, 350, 460, 350)

# Chips
$chips = @("React", "Next.js", "Laravel", "Spring Boot", "Python")
$x = 84
foreach ($chip in $chips) {
  $size = $g.MeasureString($chip, $chipFont)
  $w = [int]($size.Width) + 32
  $h = 42
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 0, 229, 255))
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 0, 229, 255), 1)
  $g.FillRectangle($brush, $x, 390, $w, $h)
  $g.DrawRectangle($pen, $x, 390, $w, $h)
  $g.DrawString($chip, $chipFont, $cyan, $x + 16, 398)
  $x += $w + 14
}

# Footer line
$g.DrawString("sabarinathan.vercel.app", $monoFont, $muted, 84, 520)
$g.DrawString("// building things that matter", $monoFont, $emerald, 84, 556)

# Terminal prompt block
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 255, 71, 87))), 1000, 120, 18, 18)
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 255, 183, 0))), 1030, 120, 18, 18)
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150, 0, 255, 136))), 1060, 120, 18, 18)

$out = Resolve-Path (Split-Path -Parent $OutPath) -ErrorAction SilentlyContinue
$full = if ($out) { Join-Path $out (Split-Path -Leaf $OutPath) } else { $OutPath }
$bmp.Save($full, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()

Write-Output "Saved $full"
