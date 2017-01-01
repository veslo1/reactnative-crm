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
                        "image": "https://loremflickr.com/200/200/avatar?@string('number', 5)",
                        "phrase": "@sentence"
                    }]
                })['personsList'].map((person, personIndex, wholeList)=> Object.assign({}, person, {
                    parentId: (() => {
                        if(person.id == 1) return wholeList.length - 1;
                        return person.id<5 && person.id>2 ? 1 : (person.parentId % 2 ? person.parentId : null)
                    })()
                }))
            );
        }, 1000);
    });
}