export function GoodParams(target, name, descriptor) {
    let sourceFunction = descriptor.value
    descriptor.value = function() {
        //
        this.goodModel = {
            _id: -1,
            name: '',
            plugList: [],
            countList: [
                {
                    name: '',
                    value: '',
                },
            ],
            cost: 0,
            tip: '',
        }
        //
        this.goodTableColumn = [
            { title: 'Id', key: '_id', width: 150 },
            { title: '商品名称', key: 'name', width: 200 },
            { title: '商品规格', key: '' },
            { title: '商品库存', key: '' },
            { title: '备注', key: 'tip', width: 200 },
            { title: '操作', key: '' },
        ]
        this.goodList = []
        // *
        sourceFunction.apply(this, arguments)
    }
}
// *
import { createGood, getGoodList, deleteGood, editGood } from '../api.js'
export function GoodFunc(TargetClass) {
    TargetClass.prototype.initGoodModel = initGoodModel
    TargetClass.prototype.renderGoodList = renderGoodList
    TargetClass.prototype.postGood = postGood
    //
    TargetClass.prototype.addGoodCount = addGoodCount
    TargetClass.prototype.deleteGoodCount = deleteGoodCount
}
// * 初始化商品表单
function initGoodModel(model) {
    model = model || {}
    this.goodModel._id = model._id || -1
    this.goodModel.name = model.name || ''
    this.goodModel.plugList = model.plugList ? Object.assign([], model.plugList) : []
    this.goodModel.countList = model.countList
        ? Object.assign([], model.countList)
        : [
              {
                  name: '',
                  value: '',
              },
          ]
    this.goodModel.cost = model.cost || 0
    this.goodModel.tip = model.tip || ''
}
// * 渲染 goodList 字段
async function renderGoodList() {
    try {
        let houseId = $store.state.houseInfo._id
        if (!houseId) throw new Error('获取仓库信息失败')
        let list = await getGoodList(houseId) // @API
        this.goodList = Object.assign([], list)
        // this.goodSourceList = Object.assign([], list.reverse()) // @Filter
        // this.initFilterParams() // @Filter
    } catch (error) {
        $common.loadOff(error)
    }
}
// * 添加新单位
function addGoodCount() {
    // @Good
    this.goodModel.countList.push({
        value: '',
        name: '',
    })
}
// * 删除单位
function deleteGoodCount(index) {
    // @Good
    if (this.goodModel.countList[index]) this.goodModel.countList.splice(index, 1)
}
// * 添加商品
async function postGood() {
    try {
        await createGood(
            $store.state.houseInfo._id,
            this.goodModel.name,
            this.goodModel.plugList,
            this.goodModel.countList,
            this.goodModel.cost,
            this.goodModel.tip
        )
        $tip('添加商品成功')
    } catch (error) {
        $common.loadOff(error)
    }
}
