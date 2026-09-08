# VHS tape — records the /ship gate as a GIF for the profile README.
# Install:  brew install charmbracelet/tap/vhs   (needs ffmpeg + ttyd)
# Record:   vhs Projects/Anomali007-Portfolio/assets/ship.tape
# Output:   ship.gif  → commit to Anomali007/anomali007/assets/ship.gif
#
# Record against a REAL repo with a REAL small diff. Do not stage a fake one —
# the point of the asset is that it is the actual gate, not a mockup.

Output ship.gif

Set Shell zsh
Set FontSize 16
Set Width 1200
Set Height 640
Set Padding 24
Set Theme "Github Dark"
Set TypingSpeed 55ms
Set Framerate 24

# Point this at whichever repo has the live change you want to show.
Hide
Type "cd ~/Development/MASS/apps/mass-lead-connect" Enter
Type "clear" Enter
Show

Sleep 800ms
Type "git status --short" Sleep 400ms Enter
Sleep 2s

Type "/ship" Sleep 600ms Enter
# Let the real gate run. Tune this to the actual runtime; trim in post if long.
Sleep 45s

Sleep 2s
