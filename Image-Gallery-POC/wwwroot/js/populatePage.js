function populateThirdLight(getFilesFromFolderIdUrl, folderId) {
    const url = `${getFilesFromFolderIdUrl}?folderId=${folderId}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log("Pinging");
            $('.content').html(data);
        })
        .catch(error => console.error(error));
}