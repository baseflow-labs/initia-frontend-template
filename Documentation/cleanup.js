// Import the Node.js built-in File System module
const fs = require("fs");

// --- Configuration ---
const INPUT_FILE = "commits.json";
const OUTPUT_FILE = "filtered_output.json";

// Define the keywords for filtering (same logic as before)
const keywords = ["Merge pull request", "sawaed"];
const filterRegex = new RegExp(keywords.join("|"), "i");

/**
 * Filters an array of strings based on predefined keywords.
 * @param {string[]} messages - The array of commit message strings.
 * @returns {string[]} The filtered array.
 */
function filterMessages(messages) {
  console.log(`\n🔍 Starting filter process...`);
  const filtered = messages.filter((message) => filterRegex.test(message));
  console.log(
    `✅ Filtered ${messages.length} down to ${filtered.length} results.`
  );
  return filtered;
}

/**
 * Main function to read, process, and write the data.
 */
function runFilterApp() {
  try {
    // 1. READ THE DATA
    console.log(`➡️ Reading data from ${INPUT_FILE}...`);
    // Read the file content as a string
    const fileContent = fs.readFileSync(INPUT_FILE, "utf8");

    // Parse the JSON string into a JavaScript array
    const commitMessages = JSON.parse(fileContent);
    console.log(`📚 Successfully loaded ${commitMessages.length} items.`);

    // 2. FILTER THE DATA
    const filteredResults = filterMessages(commitMessages);

    // 3. EXPORT THE RESULT TO NEW JSON
    console.log(`\n✍️ Writing results to ${OUTPUT_FILE}...`);
    // Convert the JavaScript array back into a formatted JSON string
    // The arguments (null, 2) format the JSON with an indentation of 2 spaces
    const jsonOutput = JSON.stringify(filteredResults, null, 2);

    // Write the JSON string to the new file
    fs.writeFileSync(OUTPUT_FILE, jsonOutput, "utf8");
    console.log(`🎉 Operation Complete! Results saved to ${OUTPUT_FILE}`);
  } catch (error) {
    // Handle any errors (e.g., file not found, invalid JSON format)
    console.error(`\n❌ An error occurred:`, error.message);
  }
}

// Execute the main function
runFilterApp();
