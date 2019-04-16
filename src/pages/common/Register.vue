<template>
  <el-dialog
    width="450px"
    title="注册"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForm.username" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
       <el-form-item label="学校" prop="school">
        <el-input v-model="dataForm.school" placeholder="学校"></el-input>
      </el-form-item>
      <el-form-item label="性别" size="mini" prop="sex">
        <el-radio-group v-model="dataForm.sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isMobile } from '@/utils/validate'
export default {
  data () {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('必填项不能为空'))
      } else {
        callback()
      }
    }
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('必填项不能为空'))
      } else if (this.dataForm.password !== value) {
        callback(new Error('确认密码与密码输入不一致'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      roleList: [],
      dataForm: {
        id: 0,
        username: '',
        password: '',
        comfirmPassword: '',
        salt: '',
        email: '',
        mobile: '',
        school: '',
        address: '',
        sex: 0,
        status: 0,
        // 用户注册成功，赋予普通用户角色
        roleIds: [3]
      },
      dataRule: {
        username: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
    },
    dataFormSubmit () {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          let params = {
            'id': this.dataForm.id,
            'username': this.dataForm.username,
            'password': this.dataForm.password,
            'salt': this.dataForm.salt,
            'email': this.dataForm.email,
            'mobile': this.dataForm.mobile,
            'school': this.dataForm.school,
            'address': this.dataForm.address,
            'sex': this.dataForm.sex,
            'status': this.dataForm.status,
            'roleIds': this.dataForm.roleIds
          }
          const { data } = await this.$store.dispatch('register', params)
          if (data.code === 201) {
            this.$message({
              message: '注册成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.visible = false
                this.$store.commit('setLoginDialg', false)
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        }
      })
    }
  }
}
</script>
