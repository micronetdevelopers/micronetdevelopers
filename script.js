function loadImage() {
    const input = document.getElementById('file-input');
    const preview = document.getElementById('image-preview');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            preview.src = reader.result;
        });

        reader.readAsDataURL(file);
    }
}

function grayscale() {
    const preview = document.getElementById('image-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    context.drawImage(preview, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const gray = 0.2989 * red + 0.5870 * green + 0.1140 * blue;

        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }

    context.putImageData(imageData, 0, 0);
    preview.src = canvas.toDataURL();
}

function invert() {
    const preview = document.getElementById('image-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    context.drawImage(preview, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    context.putImageData(imageData, 0, 0);
    preview.src = canvas.toDataURL();
}

function brighten() {
    const preview = document.getElementById('image-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    context.drawImage(preview, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const amount = 50;

    for (let i = 0; i < data.length; i += 4) {
        data[i] += amount;
        data[i + 1] += amount;
        data[i + 2] += amount;
    }

    context.putImageData(imageData, 0, 0);
    preview.src = canvas.toDataURL();
}

function reset() {
    const preview = document.getElementById('image-preview');
    preview.src = "";
}
