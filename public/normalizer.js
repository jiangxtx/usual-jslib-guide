import { normalize, schema, arrayOf } from 'normalizr'

const jsonData = {
    "id": "123",
    "author": {
        "id": "1",
        "name": "Paul"
    },
    "title": "My awesome blog post",
    "comments": [
        {
            "id": "324",
            "commenter": {
                "id": "2",
                "name": "Nicole"
            }
        }
    ]
};

// define Schema of jsonData
const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    commenter: user
});
const article = new schema.Entity('articles', {
    author: user,
    comments: [ comment ]
});

const normalizedData = normalize(jsonData, article);

console.log(`>>>>normalizer test: `, jsonData, normalizedData)


/**
 * type of Array Data
 * 数组的每个对象都糅合了 2 个维度：标题、作者，按照数据范式，应当将这两个维度拆分出来，两者的联系通过id关联起来即可
 * @type {*[]}
 * 
 * https://yq.aliyun.com/articles/3168#
 */
const jsonData_2 = [{
    id: 1,
    title: 'Some Article',
    author: {
        id: 1,
        name: 'Dan'
    }
}, {
    id: 2,
    title: 'Other Article',
    author: {
        id: 1,
        name: 'Dan'
    }
}];

const author = new schema.Entity('authors');

const article_2 = new schema.Entity('articles', {
    author: author,
    
})
const nz_jsonData_2 = normalize(jsonData_2, article_2)

console.log(`>>>>normalizer test-2: `, jsonData_2, nz_jsonData_2)