function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const ImportImages = importAll(require.context('../childpart', false, /\.(png|jpe?g|svg)$/));

export default ImportImages;
