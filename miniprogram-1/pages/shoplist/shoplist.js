// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shoplist: [],
    page: 1,
    pagesize: 10,
    total: 0,
    isLoading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    })
    this.getShoplist()
  },
  getShoplist(cd) {
    this.setData({
      isLoading: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pagesize
      },
      success: (res) => {
        this.setData({
          shoplist: [...this.data.shoplist, ...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: () => {
        this.setData({
          isLoading: false
        })
        // 隐藏loading效果
        wx.hideLoading()
        // 停止下拉刷新效果
        // 这个函数是按需调用的
        // wx.stopPullDownRefresh()
        cd && cd()
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 重置关键的数据
    this.setData({
      page: 1,
      shoplist: [],
      total: 0
    })
    // 重新发起请求
    this.getShoplist(()=>{
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.page * this.data.pagesize >= this.data.total) {
      // 证明没有下一页数据了
      return wx.showToast({
        title: '已加载完毕',
        duration: 1000,
        icon: 'none'
      })
    }
    if (this.data.isLoading) return
    this.setData({
      page: this.data.page + 1
    })
    this.getShoplist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})