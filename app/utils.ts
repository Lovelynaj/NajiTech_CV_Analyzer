//Format a file size in byte to a human readable string (KB. MB, GB)
// The function checks the byte size and converts it into the most appropriate unit (B, KB, MB, GB).
// It uses toFixed(2) to ensure the size is shown with two decimal places, like 1.25 MB.

// Converts a file size in bytes to a human-readable string (e.g., "20 MB" or "1.45 GB")
export const formatSize = (size: number): string => {
    // Determine which unit to use (B, KB, MB, GB, etc.) based on how many times 1024 fits into size
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));

    // Calculate the actual size in the selected unit
    const value = size / Math.pow(1024, i);

    // If the size is a whole number, show it without decimals, otherwise show two decimals
    const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(2);

    // Return the formatted size string with the appropriate unit
    return `${formatted} ${["B", "KB", "MB", "GB", "TB"][i]}`;
};

//UUID
export const generateUUID = () => crypto.randomUUID();

