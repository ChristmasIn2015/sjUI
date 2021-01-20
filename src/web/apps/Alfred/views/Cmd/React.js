import Cmds from '@/web/apps/Alfred/modules/Cmds.js'

export default class React {
    constructor() {
        this.initReact()
    }
    // *
    @Cmds
    @$common.TryCatch
    async initReact() {
        await this.renderCmds()
    }
}