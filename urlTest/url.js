function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Creates randomUrl, where url is the initial part of the url that is unchanged
function randomUrl(url, length) {
    let charArray = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    for (var i = 0; i < length; i++) {
        url += charArray[getRandomInt(charArray.length - 1)];
    }
    return url;
}

for (let i = 0; i < 10; i++) {
    console.log(randomUrl("http://localhost:8080/", 10))
}