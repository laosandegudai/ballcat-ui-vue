import { mapState, mapActions } from 'vuex'

export default {
  name: 'DictItemMixin',
  computed: {
    ...mapState({
      dictDataCache: state => state.dict.dictDataCache
    }),
    dictItems () {
      if (!this.dictDataCache[this.dictCode]) {
        this.requestData()
        return []
      }
      return this.dictDataCache[this.dictCode]
    }
  },
  created () {
    if (!this.dictDataCache[this.dictCode]) {
      this.requestData()
    }
  },
  methods: {
    requestData () {
      this.getDictData([this.dictCode])
    },
    ...mapActions(['getDictData']),
    getValByItem (dict) {
      let res = dict.value
      // 如果没有type， 按number 处理
      let valueType = dict.valueType || 1
      if (valueType === 1) {
        res = Number(dict.value)         // 数字
      } else if (valueType === 2) {
        res = String(dict.value)         // 字符串
      } else if (valueType === 3) {
        res = Boolean(dict.value)        // 布尔
      }
      return res
    }
  }
}
