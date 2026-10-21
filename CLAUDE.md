# Instructions for Claude

- After every reply that changes files in the repository: commit, push to `main` (and to the session branch if there is one), and end the reply with the commands Leonardo runs on his PC to get the changes:

  ```
  cd C:\projects\Progetti\RB
  git pull origin main
  ```

- Leonardo's local branch is `main` (folder C:\projects\Progetti\RB, Windows). The remote also has an old `master`: ignore it.
- Chat with Leonardo in Italian; files and data in English; commit messages in Italian (see README.md rules).
- Read project/project_memory.md first; it is the single source of truth. Check data with `python scripts/validate_data.py` and refresh `python scripts/build_data_summary.py` after data changes.
- Leonardo fills research/manual_input.ods (LibreOffice); never overwrite it without asking: he may have unsaved local changes.
