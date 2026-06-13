import { Command } from 'commander';
import { execSync } from 'node:child_process';

const script = (suffix: string) => ` 

# Exit immediately if a command exits with a non-zero status
set -eo pipefail

# Define the target directory (default to current directory if not provided)
TARGET_DIR="\${1:-.}"

# Ensure the target actually exists and is a directory
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: '$TARGET_DIR' is not a valid directory." >&2
    exit 1
fi

echo "Starting execution in: $(cd "$TARGET_DIR" && pwd)"
echo "----------------------------------------"

# Enable recursive globbing (** matches all files and zero or more directories)
# Also enable dotglob so hidden files (e.g., .env, .eslintrc) are processed
shopt -s globstar dotglob

# Counter for renamed files
count=0

for file in "$TARGET_DIR"/**; do
    # Ensure it's a regular file (skip directories and symlinks)
    if [ -f "$file" ] && [ ! -L "$file" ]; then
        
        # Guard: Skip if the file already has the ${suffix} suffix
        if [[ "$file" == *${suffix} ]]; then
            echo "Skipped (already template): $(basename "$file")"
            continue
        fi

        # Rename the file
        mv "$file" "$file${suffix}"
        echo "Renamed: $(basename "$file") -> $(basename "$file")${suffix}"
        ((count++))
    fi
done

echo "----------------------------------------"
echo "✨ Successfully renamed $count files."
`;

/**
 * Suffix file/files
 *
 * ### Example
 * ````sh
 *  vnodes suffix --username YourName
 * ````
 * @param command main command instance
 */
export function suffix(command: Command) {
  command
    .command('suffix')
    .requiredOption('-s, --suffix <string>', 'What is the suffix?')
    .action(({ suffix }) => {
      execSync(script(suffix), { stdio: 'inherit' });
    });
}
