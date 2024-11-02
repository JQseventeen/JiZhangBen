import { makeMoneyTrue } from '../../utils/money'
import { expendType, incomeType, otherType } from '../../config/type'
import { getAccount, setAccount } from '../../utils/storage'

Page({
  data: {
    type: 0,  // 0 支出，1 收入，2 不计入收支

    date: '',

    money: '',

    typeObj: expendType[0],
    expendType,
    incomeType,
    otherType,

    // 是否添加备注
    isAddRemark: false,
    remark: '',

    isAdd: false,       // 添加请求是否结束, 用于入账按钮加载效果
    isDisabled: false,  // 是否禁用入账按钮，防止多次触发
  },

  // 切换头部收支类型
  switchType (e) {
    const { type } = e.currentTarget.dataset
    const { expendType, incomeType, otherType } = this.data
    let obj = {}

    if (type === 0) obj = expendType[0]
    else if (type === 1) obj = incomeType[0]
    else if (type === 2) obj = otherType[0]

    this.setData({
      type,
      typeObj: obj,
    })
  },
  
  // 改变时间
  changeTime (e) {
    this.setData({
      date: e.detail
    })
  },

  // 输入金额
  inputMoney (e) {
    this.setData({
      money: makeMoneyTrue(e.detail.value)
    })
  },

  // 选择收支具体类型
  switchTypeName (e) {
    const typeObj = e.detail
    this.setData({
      typeObj,
    })
  },

  // 点击添加备注按钮
  readyAddRemark () {
    this.setData({
      isAddRemark: true
    })
  },

  // 输入备注
  inputRemark (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 点击入账按钮
  add () {
    const { money } = this.data

    if (money < 0.01) {
      wx.showToast({
        title: '金额不得小于 0.01',
        icon: 'none'
      })
      return
    }
    
    const { type, date,  typeObj, account, remark } = this.data

    const dataToSave = {
      type,
      date,
      typeObj,
      account,
      remark
    };

    this.setData({
      isAdd: true,
      isDisabled: true
    })
    wx.setStorageSync('accounts', dataToSave);
  },

})