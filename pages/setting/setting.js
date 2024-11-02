import { makeMoneyTrue, padMoney } from "../../utils/money";  
  
Page({  
  data: {  
    wechat: '',  
    alipay: '',  
    bank: '',  
    cash: '',  
    monthMoney: ''  
  },  
  
  onLoad() {  
    this._initAccount();  
    this._initMonthMoney();  
  },  
  
  onInput(e) {  
    const money = e.detail.value;  
    const { type } = e.currentTarget.dataset;  
  
    this.setData({  
      [`${type}`]: makeMoneyTrue(money)  
    });  
  },  
  
  clickBtn() {  
    const { wechat, alipay, bank, cash, monthMoney } = this.data;  
  
    // 使用本地存储保存账户信息  
    wx.setStorageSync('account', {  
      wechat: wechat * 100,  
      alipay: alipay * 100,  
      bank: bank * 100,  
      cash: cash * 100  
    });  
  
    // 使用本地存储保存月度可用金额  
    wx.setStorageSync('monthCanUseMoney', monthMoney * 100);  
  
    // 重启到首页  
    wx.reLaunch({  
      url: '/pages/index/index'  
    });  
  },  
  
  _initAccount() {  
    // 从本地存储中获取账户信息  
    const account = wx.getStorageSync('account') || {};  
  
    this.setData({  
      wechat: padMoney(account.wechat / 100 || 0),  
      alipay: padMoney(account.alipay / 100 || 0),  
      bank: padMoney(account.bank / 100 || 0),  
      cash: padMoney(account.cash / 100 || 0)  
    });  
  },  
  
  _initMonthMoney() {  
    // 从本地存储中获取月度可用金额  
    const monthCanUseMoney = wx.getStorageSync('monthCanUseMoney') || 0;  
  
    this.setData({  
      monthMoney: padMoney(monthCanUseMoney / 100)  
    });  
  }  
});