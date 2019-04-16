import Vue from 'vue'
import SvgIcon from '../../components/BsIcon.vue'

Vue.component('bs-icon', SvgIcon)

const content = require.context('./svg', false, /\.svg$/)
content.keys().map(content)
export default content.keys()
