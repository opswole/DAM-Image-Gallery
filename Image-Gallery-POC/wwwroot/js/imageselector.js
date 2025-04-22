$(document).ready(function() {
    let selectedImages = new Map();
    let totalSize = 0;

    // Select all images
    function selectAllImages() {
        $('.gallery-image').each(function() {
            let url = $(this).data('url');
            let filename = $(this).data('name');
            let size = parseInt($(this).data('size'));

            // Add each image to the selectedImages map
            if(!selectedImages.has(filename)) {
                selectedImages.set(filename, url);
                totalSize += size;
            }
        });

        updateCounter();
        updateTotalSize();
    }
    
    function deselectAllImages(){
        selectedImages.clear();
        totalSize = 0;
        updateCounter();
        updateTotalSize();
    }
    
    // Add image to map
    $(document).on('click', '.gallery-image', function(event) {
        event.preventDefault(); 

        // Get the data attributes of the clicked image
        let url = $(this).data('url');
        let filename = $(this).data('name');
        let size = parseInt($(this).data('size'));

        console.log("Filename:", filename);
        console.log("Size:", size);

        if (selectedImages.has(filename)) {
            // If the image is already in the map, remove it
            selectedImages.delete(filename);
            totalSize -= size;
        } else {
            // If the image is not in the map, add it
            selectedImages.set(filename, url);
            totalSize += size;
        }

        updateCounter();
        updateTotalSize();
    });

    // Pipe Download
    $(document).on('click', '#pipeDownload', function() {
        let imageArray = Array.from(selectedImages.entries()).map(([name, url]) => ({ Name: name, Url: url }));
        
        console.time("Pipe Download")
        $.ajax({
            traditional: true,
            url: processImageUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(imageArray),
            xhrFields: {
                responseType: 'blob'
            },
            success: function(blob) {
                console.log('Success:', blob);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "Images.zip";
                link.click();
                
                console.timeEnd("Pipe Download")
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        })
    });

    // Memory Download
    $(document).on('click', '#memoryDownload', function() {
        let imageArray = Array.from(selectedImages.entries()).map(([name, url]) => ({ Name: name, Url: url }));

        console.time("Memory Download")
        
        $.ajax({
            traditional: true,
            url: processImageUrlInMemory,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(imageArray),
            xhrFields: {
                responseType: 'blob'
            },
            success: function(blob) {
                console.log('Success:', blob);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "Images.zip";
                link.click();
                
                console.timeEnd("Memory Download")
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        })
    });

    $(document).on('click', '#selectAll', function() {
        selectAllImages();
    });
    
    $(document).on('click', '#deselectAll', function() {
        deselectAllImages();
    });
    
    function updateCounter() {
        $('#counter').text(`Selected: ${selectedImages.size}`);
    }

    function updateTotalSize() {
        $('#size').text(`Total Size: ${bytesToMB(totalSize)}MB`);
    }

    function bytesToMB(bytes) {
        if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) {
            throw new Error('Invalid input. Please provide a non-negative number of bytes.');
        }

        return (bytes / (1024 * 1024)).toFixed(2);
    }
});
