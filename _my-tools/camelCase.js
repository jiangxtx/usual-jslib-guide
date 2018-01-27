/**
 * Created by 仲夏 on 2018/1/28.
 *
 * 公共方法的封装，可视为顶层封装。至少要考虑到如下几点：
 *      1. 函数参数，要做到：精简、互斥。
 *      2. 参数的校验，必不可少。
 *
 * joint2Camel 方法.
 *  举例：将background-color转换为驼峰表示法backgroundColor
 */

function joint2Camel(str) {
    if (str == null) return undefined;
    if (typeof str !== 'string') {
        /**
         * 这地方，不要用以前惯用写法：console.err()。原因有二：
         *   1. console方法，旨在调试之用，很可能某些打包工具会在构建时，把console方法都drop 掉。例如webpack就有相关配置项。
         *   2. console的宿主环境，相当于默认windowl了，即浏览器环境下。而现在服务端NodeJS也很盛行，Error能够实现代码同构。
         *   ——jiangxtx 2018-1-28 00:24.
         */
        throw Error('param should be a string')
    }
    return str.replace(/-([a-z])/ig, function(match, letter) {
        return letter.toUpperCase()
    });
}

function camel2Joint(str) {
    if (str == null) return undefined;
    if (typeof str !== 'string') {
        throw Error('param should be a string')
    }
    return str.replace(/([A-Z])/g,"-$1").toLowerCase();
}