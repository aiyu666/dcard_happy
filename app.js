const download = require('image-downloader');
const request = require('./module/request.js');
const uploadToGoogleDrive = require('./module/googleDrive');

(async () => {
    const res = await request.getRequest('https://www.dcard.tw/service/api/v2/forums/beauty/posts');
    if (!(res.statusCode === 200)) return;
    const responseBody = await JSON.parse(res.body);
    const targetPosts = await responseBody.filter((post) => 'mediaMeta' in post && post.mediaMeta.length !== 0);
    await targetPosts.forEach((targetPost) => {
        const mediaData = targetPost.mediaMeta.filter((mediaMeta) => mediaMeta.type !== 'image/thumbnail');
        const options = {
            url: mediaData[0].url,
            dest: `./asset/${mediaData[0].id}.jpeg`,
        };
        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename.split('./asset/')[1]);
                uploadToGoogleDrive(filename.split('./asset/')[1], filename);
            })
            .catch((err) => console.error(err));
    });
})();
