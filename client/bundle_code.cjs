const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const IGNORE_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
  ".vscode",
];
const IGNORE_FILES = [
  "package-lock.json",
  "yarn.lock",
  ".DS_Store",
  "bundle_code.js",
  ".env",
];
const ALLOWED_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".json",
  ".html",
  ".md",
];

// Function to scan directory
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        scanDirectory(filePath, fileList);
      }
    } else {
      if (
        !IGNORE_FILES.includes(file) &&
        ALLOWED_EXTENSIONS.includes(path.extname(file))
      ) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Function to generate the bundle
function bundleProject() {
  const rootDir = process.cwd();
  const allFiles = scanDirectory(rootDir);
  let output = "";

  console.log(`Found ${allFiles.length} files. Bundling...`);

  allFiles.forEach((filePath) => {
    const relativePath = path.relative(rootDir, filePath);
    const content = fs.readFileSync(filePath, "utf8");

    output += `\n\n// ==========================================\n`;
    output += `// FILE: ${relativePath}\n`;
    output += `// ==========================================\n\n`;
    output += content;
  });

  // Write to a file named 'full_project_code.txt'
  fs.writeFileSync("full_project_code.txt", output);
  console.log("✅ Done! Open 'full_project_code.txt' and copy its content.");
}

bundleProject();
