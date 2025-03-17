import fs from "fs";
import path from "path";

function getPhotos(dir) {
    const results = {};

    const photoExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    fs.readdirSync(dir).forEach(category => {
        const catPath = path.join(dir, category);
        const catStat = fs.statSync(catPath);

        if (!catStat.isDirectory()) {
            console.error("Top level must be directory");
        }

        results[category] = [];

        fs.readdirSync(catPath).forEach(photo => {
            const photoPath = path.join(catPath, photo);
            const photoStat = fs.statSync(photoPath);

            if (photoStat.isDirectory()) {
                console.error("Directory can only contain photos");
            }

            if (photoExtensions.includes(path.extname(photo).toLowerCase())) {
                results[category].push({
                    url: `${photoPath.replace("src/", "").replace(/\\/g, "/")}`,
                    name: photo,
                    category: category,
                });
            }
        });
    });

    return results;
}

export default config => {
    config.addPassthroughCopy({"./src/static": "."});
    config.addWatchTarget("./src/static");

    config.addPassthroughCopy({"./src/photos": "./photos"});
    config.addCollection("photos", () => getPhotos("src/photos"));

    return {
        dir: {
            input: 'src',
            output: 'build',
        },
    };
};

