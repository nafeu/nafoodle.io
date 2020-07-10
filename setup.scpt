tell application "iTerm2"
  tell current window
    create tab with profile "default"
  end tell

  tell first session of current tab of current window
    write text "cd ~/Development/github/nafoodle.io && subl ."
    write text "subl $(git diff --name-only HEAD~ HEAD)"
    write text "less ~/Development/github/nafoodle.io/devnotes.txt"
    split vertically with profile "default"
  end tell

  tell second session of current tab of current window
    write text "nvm use v12.14.1 && npm run dev"
    split horizontally with profile "default"
  end tell

  tell third session of current tab of current window
    write text "nvm use v12.14.1 && cd client && npm start"
  end tell
end tell