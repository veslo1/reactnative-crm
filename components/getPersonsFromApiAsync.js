const Mock = require('mockjs')

export default async () => {
    return Mock.mock({
        'personsList|1-20': [{
            "id|+1": 1,
            "name": "@name",
            "parentId|0-200": 0,
            "age|18-100": 18,
            "phone": "(@string('number', 3)) @string('number', 3)-@string('number', 4)",
            "image": "https://loremflickr.com/200/200/avatar?@string('number', 5)",
            "phrase": "@sentence"
        }]
    })['personsList'].map(person => Object.assign({}, person, {
        parentId: person.parentId%2 ? person.parentId : null
    }))
}