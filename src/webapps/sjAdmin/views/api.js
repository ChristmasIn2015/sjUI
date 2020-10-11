const _server = new $common.Server(
    // 成功
    (result, resolve, reject) => {
        result = result.data
        result.code === 200 ? resolve(result.data) : reject(result.message)
    },
    // 失败
    (error, reject) => reject(error.message),
    'http://192.168.0.106:80'
    // 'http://10.52.2.35:80'
)
// ======================================================= 客户
// * 新增客户
export function createCustomer(companyName, companyAddress, contact) {
    let params = { companyName, companyAddress, contact }
    return _server.request('POST', '/sjShop/customer/create', params, $common.getHeader())
}
// * 获取客户列表
export function getCustomerList() {
    let params = {}
    return _server.request('POST', '/sjShop/customer/list', params, $common.getHeader())
}
// ======================================================= 订单
// * 新增订单
export function createOrder(houseId, mockGoodList) {
    let params = { houseId, mockGoodList }
    return _server.request('POST', '/sjShop/order/create', params, $common.getHeader())
}
// * 获取订单列表
export function getOrderList(houseId) {
    let params = { houseId }
    return _server.request('POST', '/sjShop/order/list', params, $common.getHeader())
}
// ======================================================= 标签
// * 新增标签
export function createTag(goodId, name, value) {
    let params = { goodId, name, value }
    return _server.request('POST', '/sjShop/tag/create', params, $common.getHeader())
}
// * 获取标签列表
export function getPlugTagList(goodId) {
    let params = { goodId }
    return _server.request('POST', '/sjShop/tag/plugList', params, $common.getHeader())
}
// * 删除标签
export function deleteTag(tagId) {
    let params = { tagId }
    return _server.request('POST', '/sjShop/tag/delete', params, $common.getHeader())
}
// ======================================================= 商品
// * 新增商品
export function createGood(byHouseId, name, plugList, countList, cost, tip) {
    let params = { byHouseId, name, plugList, countList, cost, tip }
    return _server.request('POST', '/sjShop/good/create', params, $common.getHeader())
}
// * 获取商品列表
export function getGoodList(byHouseId) {
    let params = { byHouseId }
    return _server.request('POST', '/sjShop/good/list', params, $common.getHeader())
}
// * 删除商品
export function deleteGood(houseId, goodId) {
    let params = { houseId, goodId }
    return _server.request('POST', '/sjShop/good/delete', params, $common.getHeader())
}
// * 编辑商品
export function editGood(houseId, _id, name, plugList, countList, cost, tip) {
    let params = { _id, houseId, name, plugList, countList, cost, tip }
    return _server.request('POST', '/sjShop/good/edit', params, $common.getHeader())
}
// ======================================================= 员工
// * 店铺新增员工
export function createEmployee(phone, shopId) {
    let params = { phone, shopId }
    return _server.request('POST', '/sjShop/employee/create', params, $common.getHeader())
}
// * 店铺员工列表
export function getEmployeeList(shopId) {
    let params = { shopId }
    return _server.request('POST', '/sjShop/employee/list', params, $common.getHeader())
}
// * 店铺删除员工
export function deleteEmployee(employeeId) {
    let params = { employeeId }
    return _server.request('POST', '/sjShop/employee/delete', params, $common.getHeader())
}
// ======================================================= 仓库
// * 新开仓库
export function createHouse(shopId) {
    let params = { shopId, name: `新仓库 ${parseInt(Math.random() * 10000)}` }
    return _server.request('POST', '/sjShop/house/create', params, $common.getHeader())
}
// * 获取我管理的仓库列表
export function getHouseList(shopId) {
    let params = { shopId }
    return _server.request('POST', '/sjShop/house/list', params, $common.getHeader())
}
// * 仓库删除
// export function deleteShopWareHouse(shopId, wareHouseId) {
//     let params = { shopId, wareHouseId }
//     return _server.request('POST', '/sjShop/house/delete', params, $common.getHeader())
// }
// ======================================================= 店铺
// * 新开店铺
export function createShop() {
    let params = { name: `新店铺 ${parseInt(Math.random() * 10000)}` }
    return _server.request('POST', '/sjShop/shop/create', params, $common.getHeader())
}
// * 获取我管理的店铺列表
export function getShopList() {
    let params = {}
    return _server.request('GET', '/sjShop/shop/list', params, $common.getHeader())
}
// * 店铺删除
export function deleteShop(shopId) {
    let params = { shopId }
    return _server.request('POST', '/sjShop/shop/delete', params, $common.getHeader())
}
// ======================================================= 用户
// * 获取用户信息
export function getUserInfo() {
    let params = {}
    return _server.request('GET', '/sjShop/user/info', params, $common.getHeader())
}
// * 用户注册/登录
export function shopUserLogin(name, phone, password) {
    let params = { name, phone, password }
    return _server.request('POST', '/sjShop/user/login', params)
}
