Page({  
  data: {  
    totalMoney: '',  
    monthCanUseMoney: '',  
    monthLeftoverMoney: '',  
    expend: '',  
    income: '',  
  
    isNetworkError: false,  
    isReloading: false  
  },  
  
  onLoad() {  
    // 从本地缓存中取出账户余额以及每月可支配金额  
    const totalMoney = wx.getStorageSync('totalMoney') || '0.00';  
    const monthCanUseMoney = wx.getStorageSync('monthCanUseMoney') || '0.00';  
  
    this.setData({  
      totalMoney: padMoney(parseFloat(totalMoney)), // 假设存储的是字符串，需要转换为数字  
      monthCanUseMoney: padMoney(parseFloat(monthCanUseMoney))  
    });  
  
    // 加载模拟的每月总收入与总支出以及月剩余可支配金额（这里可以移除网络请求，直接设置数据）  
    this._setMockData();  
  },  
  
  // 重新加载数据（在这里，由于我们使用本地缓存，所以实际上只是重新读取数据）  
  reload() {  
    this.setData({  
      isReloading: true  
    });  
  
    // 由于数据是本地的，所以不需要真正的加载过程，只需重新读取即可  
    setTimeout(() => {  
      this._setMockData();  
      this.setData({  
        isReloading: false  
      });  
    }, 0); // 使用setTimeout来模拟异步操作，以便更新UI  
  },  
  
  /**  
   * 用于设置模拟的每月总收入与总支出以及月剩余可支配金额  
   */  
  _setMockData() {  
    // 这里我们硬编码一些数据作为示例  
    const mockIncome = '2000.00'; // 假设的月收入  
    const mockExpend = '1500.00'; // 假设的月支出  
  
    // 计算月剩余可支配金额  
    const monthLeftoverMoney = padMoney(parseFloat(this.data.monthCanUseMoney) - parseFloat(mockExpend));  
  
    // 设置数据到页面状态  
    this.setData({  
      expend: padMoney(parseFloat(mockExpend)),  
      income: padMoney(parseFloat(mockIncome)),  
      monthLeftoverMoney,  
      isNetworkError: false  
    });  
  
    // 可选：将数据保存到本地缓存中（如果需要的话）  
    // wx.setStorageSync('expend', mockExpend);  
    // wx.setStorageSync('income', mockIncome);  
    // 注意：由于我们硬编码了数据，所以实际上不需要保存这些数据到缓存中，除非有其他用途。  
  }  
  
  // 注意：_load 和 _loadMonthLeftoverMoney 方法已被移除，因为我们现在使用本地模拟数据。  
  // 如果您想保留这些方法的结构以便将来使用，可以将它们保留为空函数或注释掉。  
});  
  
// 假设的 padMoney 函数（如果未在其他文件中定义）  
function padMoney(money) {  
  return money.toFixed(2); // 简单地将数字格式化为两位小数  
}  
  
// 注意：subtraction 函数如果未在其他文件中定义，也需要在这里定义或移除对它的调用。  
// 如果只是简单的减法，可以直接使用 JavaScript 的减法运算符。