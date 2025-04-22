function bytesToMB(bytes) {
    if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) {
        throw new Error('Invalid input. Please provide a non-negative number of bytes.');
    }

    return (bytes / (1024 * 1024)).toFixed(2);
}