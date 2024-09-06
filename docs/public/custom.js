// 确保脚本在 DOM 完全加载后运行
document.addEventListener('DOMContentLoaded', function () {
  // 选择 .VPNavBarTitle 元素
  const navBarTitle = document.querySelector('.VPNavBarTitle')
  debugger
  if (navBarTitle) {
    // 为 .VPNavBarTitle 元素添加点击事件监听器
    navBarTitle.addEventListener('click', function () {
      // 刷新页面
      location.reload()
    })
  }
})
