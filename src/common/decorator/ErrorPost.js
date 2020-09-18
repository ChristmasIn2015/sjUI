import axios from 'axios'
export default function ErrorPost(TargetClass) {
    // * 在本地服务器 10.52.2.35 上存储错误信息
    TargetClass.prototype.postMyError = postMyError
}
function postMyError(message) {
    return
    axios({
        method: 'POST',
        url: 'http://10.52.2.35/sjShop/error/create',
        data: { message: message },
        headers: {},
    })
}
function postHtmlError() {
    // * 监听所有HTML报错
    window.onerror = function(message, source, lineno, colno, error) {
        $common.postMyError(message)
    }
    console.log(`%c @ErrorPost: 监听错误日志 成功`, 'color: green;')
}
