export default {
  created (el: any, binding: any, vnode: any) {
    console.log('el====>', el)
    console.log('binding====>', binding)
    console.log('vnode====>', vnode)
  }, // 新增
  beforeMount () {},
  mounted () {},
  beforeUpdate () {}, // 新增
  updated () {},
  beforeUnmount () {}, // 新增
  unmounted () {}
}
