const ALLOWED_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'webp',
  'mp4', 'mov', 'webm', 'mkv'
])

export async function scanDirectory(dirHandle) {
  const files = []
  
  // Iterate through the directory
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file') {
      const name = entry.name.toLowerCase()
      const ext = name.split('.').pop()
      
      if (ALLOWED_EXTENSIONS.has(ext)) {
        files.push(entry) // Keep the handle
      }
    }
    // Optional: Recursion could go here if requested
  }
  
  return files
}
