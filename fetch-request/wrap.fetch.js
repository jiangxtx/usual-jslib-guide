/**
 * Created by Jiangxtx on 2017/1/4.
 * This module aims to wrap fetch request and some common methods about fetch-request.
 * As you need ajax request, USE fetch here, thus can improve stability in the long run.
 * 这么做的一个最大好处就是：方便后续对 fetch 请求的管理、优化与维护，即便再以后采用其他新的技术，
 * 参数想必都是大同小异，只需把外在包装的函数体更新一番即可。由此观之，该 fetch-ajax 可视为对 jQuery-ajax 的技术更新迭代。
 *
 *      --jiangxtx 2017-1-4
 *
 *      使用示例：
 *
         fetchAjax({
            url: 'userData.json',
            type: 'get',
            dataType: 'json',
            isUpload: false,
            success: (json) => {
                console.log(`fetchAjax success: ${json}`)
                // TODO, deal with codes in condition of Success...
            },
            error: (data) => {
                console.error(`fetchAjax Error: ${data}`)
                // TODO, deal with Errors while fetching...
            }
        })
 */

import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import queryString from 'query-string'

if (!window.Promise) {
    window.Promise = Promise;
}
const FETCH_BASE_URL = 'http://192.168.11.123/'  // 基准 url 路径示例

const headers = {
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json, text/javascript,*/*'
};

// 'include' is to send cookies in a cross-origin resource sharing request,'same-origin' is the opposite
const credentials = 'include';

/**
 * fetch 请求的 ajax 封装（仿照 jQuery Ajax 的封装方式，来封装 fetch 请求）
 * 
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
 * isUpload 是否为文件上传形式，true or false
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * success 成功回调函数
 * error 失败回调函数
 */
function fetchAjax(obj={}) {
    const { url, data, type='get', dataType='json', isUpload=false, success, error } = obj;

    const fetchData = {
        credentials,    // 'include' is to send cookies in a cross-origin resource sharing request,'same-origin' is the opposite
        headers,
        method: type
    };

    if (isUpload) {
        const fileData = Object.prototype.toString.call(data);
        if (fileData !== "[object FormData]") {
            throw new Error('fetchAjax uploadData should be type of "FormData!');
            return false;
        }

        fetchData.method = 'POST';
        fetchData.body = data;
    } else {
        fetchData.body = queryString.stringify(data);
    }

    let fetchUrl = FETCH_BASE_URL + url;

    let _fetch = null;
    if (type === 'get') {
        _fetch = window.fetch(fetchUrl, {
            method: 'get',
            credentials,
            headers,
        });
    } else {
        _fetch = window.fetch(fetchUrl, fetchData);
    }

    _fetch(fetchUrl, fetchData).then(res => {
        if((res.status >= 200 && res.status < 300)|| res.ok) {
            const resPromise = (dataType === 'json') ? res.json() :
                                (dataType === 'html') ? res.text() : null;
            if (resPromise == null) {
                throw new Error('fetchAjax param of dataType Error!');
            }

            resPromise.then(result => {
                success(result)
            }, function (err) {
                error({
                    info: 'fetch error',
                    detail: err
                })
            })
        } else {  // fetch error
            var fetchError = new Error(res.statusText)
            fetchError.response = res;

            error({
                info: 'fetch error',
                detail: fetchError
            })
        }
    })
}

export { fetchAjax }