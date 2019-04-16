import BsProduct from '@/components/BsProduct.vue'
import BsPicture from '@/components/BsPicture.vue'

export default {
  install (Vue) {
    Vue.component('bs-product', BsProduct)
    Vue.component('bs-picture', BsPicture)
  }
}
