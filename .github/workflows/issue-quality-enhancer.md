---
on:
  issues:
    types: [opened]
permissions:
  issues: read
safe-outputs:
  update-issue:
    title:
    body:
tools:
  github:
    toolsets: [issues]
---
# Issue Quality Enhancer
Enhance new issues to make them clear, well-structured, and easy to understand.
## Issue to enhance
| Field  | Value          |
| ------ | -------------- |
| Number | #$ISSUE_NUMBER |
| Author | @$ISSUE_AUTHOR |
| Title  | $ISSUE_TITLE   |
| Body   | $ISSUE_BODY    |
## Your tasks
### 1. Get context
- Inspect the source code
### 2. Improve the title
Add an emoji prefix based on the issue type:
- 🐛 Bug
- ✨ Feature
- 📝 Docs
- 🔧 Refactor
- ⚡ Performance
Example: `🐛 Fix login error when password contains special characters`
### 3. Restructure the body
Use clear sections with emoji headers:
**For bugs:**
```
## 🐛 Description
## 📋 Steps to Reproduce
## ✅ Expected vs ❌ Actual Behavior
```
**For features:**
```
## ✨ Description
## 🎯 Why is this needed?
## 📐 Proposed Solution
```
### 4. Add footer
```
---
> ✍️ *Enhanced by Copilot. Original author: @$ISSUE_AUTHOR*
```
### 5. Apply changes
- **Update** issue #$ISSUE_NUMBER with the new title and body
- **Assign** 1-3 relevant labels
- **Comment** with a brief summary of improvements

## Rules
- Never change the original meaning
- If already well-written, make minimal changes
- Keep it simple, not verbose
- Performance type issues need an extra step. Why is this needed? section should try to include metrics on what is causing issues or potential slow performance.
