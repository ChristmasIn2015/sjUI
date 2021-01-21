import Response from '../../../../database/Response.js'
export default class House {
    constructor() {}
    #getModel() {
        return {
            name: -1,
            byShopId: '',
        }
    }
    //
    @Response('创建仓库成功')
    async addHouse(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.
        let query = { shopId: request.body.shopId, userId: user._id, role: 0 }
        let shopDoc = await $db.Employee.get(query)
        if (!shopDoc) throw new Error('您选择的店铺不存在, 请重新选择店铺')

        // 3.
        let model = this.#getModel()
        model.name = request.body.name
        model.byShopId = request.body.shopId
        await $db.House.create(model)
    }

    //
    @Response()
    async getHouseList(request, response) {
        // 1.
        let user = await Cabin.userCharge(request, response)

        // 2.根据店铺id取得所有仓库
        let list = await $db.House.query({ byShopId: request.body.shopId })
        return list
    }
}
