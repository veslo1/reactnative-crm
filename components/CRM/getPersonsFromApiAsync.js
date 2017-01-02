const Mock = require('mockjs')

export default async () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(
                Mock.mock({
                    'personsList|1-200': [{
                        "id|+1": 1,
                        "name": "@name",
                        "parentId|0-200": 0,
                        "age|18-100": 18,
                        "phone": "(@string('number', 3)) @string('number', 3)-@string('number', 4)",
                        "image": "@image('100x100', '#FFF', '${index}')",
                        "phrase": "@sentence"
                    }]
                })['personsList'].map((person, personIndex, wholeList)=> Object.assign({}, person, {
                    image: person.image
                        .replace('${index}', `${personIndex+1}`)
                        .replace(/http\:/, 'https:')
                        .replace('FFF', Mock.mock('@color').replace('#', '')),
                    // id: personIndex + 1,
                    parentId: (() => {
                        if(person.id == 1) return wholeList.length - 1;
                        return (person.id<10 && person.id>2) ? (person.id%2+1) : (Math.random()>.3 ? person.parentId : null)
                    })()
                }))
            );
        }, 500);
    });
}