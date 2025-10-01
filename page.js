function explode() {
    const type = document.getElementById('type').value;
    const vlog = document.getElementById('vlog-name').value;
    const caption = document.getElementById('caption').value;
    const url = document.getElementById('URL').value;
    const photos = document.getElementById('photos').value;
    const bin = document.getElementById('bin').value;
    const vlogno = document.getElementById('vlogno').value;
    const now = new Date();
    const timecode = now.toISOString().split('.')[0];

    let output = "";

    if (type === 'vlog') {
        output = `{ "url": "${url}", "timestamp": "${timecode}", "type": "vlog", "caption": "${caption}", "vlog": "${vlog}", "vlogno": "${vlogno}" }`;
        navigator.clipboard.writeText(output);
        alert("Vlog: " + output);

    } else if (type === "video") {
        output = `{ "url": "${url}", "timestamp": "${timecode}", "type": "video", "caption": "${caption}" }`;
        navigator.clipboard.writeText(output);
        alert("Video: " + output);

    } else if (type === "photo") {
        const indPhotos = photos.split(",");
        output = `{ "count": ${indPhotos.length}, "timestamp": "${timecode}", "type": "photo", "caption": "${caption}"`;
        for (let i = 1; i <= indPhotos.length; i++) {
            output += `, "photo${i}": "${indPhotos[i-1]}"`;
        }
        output += ` }`;
        navigator.clipboard.writeText(output);
        alert("Photos: " + output);

    }else if(type === "story"){
        output = `{ "url": "${url}", "timestamp": "${timecode}", "bin": "${bin}" }`;
        navigator.clipboard.writeText(output);
        alert("Video: " + output);
    } else {
        alert("no");
    }
}
