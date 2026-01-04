## Summary

Extends `tui.input.changed` hook to allow plugins to switch TUI input mode between "normal" and "shell". Enables Warp-like intent detection where typing `git status` can auto-switch to Shell mode.

Depends on: feat/tui-input-changed-hook

## Changed Files

- `packages/plugin/src/index.ts` - Add `currentMode` input and `mode` output to hook
- `packages/opencode/src/server/server.ts` - Return `mode` from endpoint when plugin sets it
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx` - Update `store.mode` on response
- `packages/opencode/test/server/plugin-input-changed.test.ts` - Add mode switching tests

## Test Coverage

5 tests covering valid requests, validation, and mode parameter handling.
