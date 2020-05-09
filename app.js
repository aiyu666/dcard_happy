const request = require('./module/request.js');
const downloadImg = require('./module/downloadImg.js');

(async () => {
    const happyMedia = [];
    const res = await request.getRequest('https://www.dcard.tw/service/api/v2/forums/beauty/posts');
    if (!(res.statusCode === 200)) return;
    const responseBody = await JSON.parse(res.body);
    const targetPosts = await responseBody.filter((post) => 'mediaMeta' in post && post.mediaMeta.length !== 0);
    await targetPosts.forEach((targetPost) => {
        const mediaData = targetPost.mediaMeta.filter((mediaMeta) => mediaMeta.type !== 'image/thumbnail');
        downloadImg(mediaData[0].url, `${mediaData[0].id}.jpeg`, () => {
            console.log(`Download ${mediaData[0].id} finished`);
        });
        happyMedia.push({ id: mediaData[0].id, url: mediaData[0].url });
    });
    console.log(happyMedia);
})();
