# Grimer

A browser-based media cleaner that lets you swipe through the files in a local folder — swipe right to mark for deletion, swipe left to keep — then review and permanently delete the unwanted ones.

## How it works

1. **Open a folder** — click *Open Folder* and grant read/write access to a local directory via the browser's [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API).
2. **Swipe** — media files are shown one at a time as cards:
   - Swipe / drag **right** (or click *Delete*) to mark a file for deletion.
   - Swipe / drag **left** (or click *Keep*) to keep the file.
3. **Review** — once all files have been swiped, a grid shows every file marked for deletion. You can restore individual files before committing.
4. **Delete** — confirm to permanently remove the marked files from disk.

## Supported file types

| Type   | Extensions                        |
|--------|-----------------------------------|
| Image  | `.jpg` `.jpeg` `.png` `.gif` `.webp` |
| Video  | `.mp4` `.mov` `.webm` `.mkv`      |

## Browser requirements

The File System Access API is required. It is supported in Chromium-based browsers (Chrome, Edge, Opera) version 86 and later. Firefox and Safari do **not** support this API; the app will display an error message on unsupported browsers.

## Development

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- [Vue 3](https://vuejs.org/) (`<script setup>` SFCs)
- [Vite](https://vitejs.dev/)
