const _server = $common.getServer(
    // 成功
    (result, resolve, reject) => {
        result = result.data
        result.code === 200 ? resolve(result.data) : reject(result.message)
    },
    // 失败
    (error, reject) => reject(error.message),
    'http://192.168.0.108:7000'
    // 'http://42.193.102.196:7002'
)
// ======================================================= 客户
// * 新增客户
export function createCustomer(companyName, companyAddress, contact) {
    let params = { companyName, companyAddress, contact }
    return _server.request('POST', '/qt-shop/customer/create', params, $common.getHeaders())
}
// * 获取客户列表
export function getCustomerList() {
    let params = {}
    return _server.request('POST', '/qt-shop/customer/list', params, $common.getHeaders())
}
// ======================================================= 订单
// * 新增订单
export function createOrder(houseId, goodList, customerPicked) {
    let params = { houseId, goodList, customerPicked }
    return _server.request('POST', '/qt-shop/order/create', params, $common.getHeaders())
}
// * 获取订单列表
export function getOrderList(houseId) {
    let params = { houseId }
    return _server.request('POST', '/qt-shop/order/list', params, $common.getHeaders())
}
// * 修改订单状态
export function changeOrderStatus(orderId, goodStatus, priceStatus) {
    let params = { orderId, goodStatus, priceStatus }
    return _server.request('POST', '/qt-shop/order/changeStatus', params, $common.getHeaders())
}
// * 库存撤回
export function clearOrderGood(orderId) {
    let params = { orderId }
    return _server.request('POST', '/qt-shop/order/clearOrderGood', params, $common.getHeaders())
}
// * 订单修改
export function updateOrder(orderId, goodList) {
    let params = { orderId, goodList }
    return _server.request('POST', '/qt-shop/order/updateOrder', params, $common.getHeaders())
}
// ======================================================= 标签
// * 新增标签
export function createTag(goodId, name, value) {
    let params = { goodId, name, value }
    return _server.request('POST', '/qt-shop/tag/create', params, $common.getHeaders())
}
// * 获取标签列表
export function getPlugTagList(goodId) {
    let params = { goodId }
    return _server.request('POST', '/qt-shop/tag/plugList', params, $common.getHeaders())
}
// * 删除标签
export function deleteTag(tagId) {
    let params = { tagId }
    return _server.request('POST', '/qt-shop/tag/delete', params, $common.getHeaders())
}
// ======================================================= 商品
// * 新增商品
export function createGood(byHouseId, name, plugList, countList, cost, tip) {
    let params = { byHouseId, name, plugList, countList, cost, tip }
    return _server.request('POST', '/qt-shop/good/create', params, $common.getHeaders())
}
// * 获取商品列表
export function getGoodList(byHouseId) {
    let params = { byHouseId }
    return _server.request('POST', '/qt-shop/good/list', params, $common.getHeaders())
}
// * 删除商品
export function deleteGood(houseId, goodId) {
    let params = { houseId, goodId }
    return _server.request('POST', '/qt-shop/good/delete', params, $common.getHeaders())
}
// * 编辑商品
export function editGood(houseId, _id, name, plugList, countList, cost, tip) {
    let params = { houseId, _id, name, plugList, countList, cost, tip }
    return _server.request('POST', '/qt-shop/good/edit', params, $common.getHeaders())
}
// ======================================================= 员工
// * 店铺新增员工
export function createEmployee(phone, shopId) {
    let params = { phone, shopId }
    return _server.request('POST', '/qt-shop/employee/create', params, $common.getHeaders())
}
// * 店铺员工列表
export function getEmployeeList(shopId) {
    let params = { shopId }
    return _server.request('POST', '/qt-shop/employee/list', params, $common.getHeaders())
}
// * 店铺删除员工
export function deleteEmployee(employeeId) {
    let params = { employeeId }
    return _server.request('POST', '/qt-shop/employee/delete', params, $common.getHeaders())
}
// ======================================================= 仓库
// * 新开仓库
export function createHouse(shopId, name) {
    let params = { shopId: shopId, name: name }
    return _server.request('POST', '/qt-shop/house/create', params, $common.getHeaders())
}
// * 获取我管理的仓库列表
export function getHouseList(shopId) {
    let params = { shopId }
    return _server.request('POST', '/qt-shop/house/list', params, $common.getHeaders())
}
// * 仓库删除
// export function deleteShopWareHouse(shopId, wareHouseId) {
//     let params = { shopId, wareHouseId }
//     return _server.request('POST', '/qt-shop/house/delete', params, $common.getHeaders())
// }
// ======================================================= 店铺
// * 新开店铺
export function createShop(name) {
    let params = { name: name }
    return _server.request('POST', '/qt-shop/shop/create', params, $common.getHeaders())
}
// * 获取我管理的店铺列表
export function getShopList() {
    let params = {}
    return _server.request('GET', '/qt-shop/shop/list', params, $common.getHeaders())
}
// * 店铺删除
export function deleteShop(shopId) {
    let params = { shopId }
    return _server.request('POST', '/qt-shop/shop/delete', params, $common.getHeaders())
}
// ======================================================= 用户
// * 获取用户信息
export function getUserInfo() {
    let params = {}
    return _server.request('GET', '/qt-shop/user/info', params, $common.getHeaders())
}
// * 用户注册/登录
export function shopUserLogin(name, phone, password) {
    let params = { name, phone, password }
    return _server.request('POST', '/qt-shop/user/login', params)
}
