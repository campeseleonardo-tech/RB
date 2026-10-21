@echo off
rem Double-click this file to check the data and rebuild viewer\atlas.html.
setlocal
cd /d "%~dp0"

set "PY="
where py >nul 2>nul && set "PY=py -3"
if not defined PY where python >nul 2>nul && set "PY=python"
if not defined PY (
  echo Python 3 was not found on this computer.
  echo Install it from https://www.python.org/downloads/ and tick "Add python.exe to PATH".
  echo Then double-click this file again.
  pause
  exit /b 1
)

echo Step 1 of 2: checking the data...
echo.
%PY% validate_data.py
if errorlevel 1 (
  echo.
  echo STOPPED: the data has errors. Read the messages above, fix them, then run this file again.
  pause
  exit /b 1
)

echo.
echo Step 2 of 2: building the viewer...
echo.
%PY% build_viewer.py
if errorlevel 1 (
  echo.
  echo STOPPED: the viewer could not be built. Read the message above.
  pause
  exit /b 1
)

echo.
echo OK: viewer\atlas.html is ready. Double-click it to open it.
pause
exit /b 0
