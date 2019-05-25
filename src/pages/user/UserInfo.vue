<template>
  <div class="userinfo">
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
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
        <el-form-item label="学校" prop="school">
        <el-input v-model="dataForm.school" placeholder="学校"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="地址"></el-input>
      </el-form-item>
        <el-form-item label="性别" size="mini" prop="sex">
        <el-radio-group v-model="dataForm.sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer a-c">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="dataFormSubmit()">确定</el-button>
    </div>
  </div>
</template>

<script>
import { isEmail, isMobile } from '@/utils/validate'
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
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
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
      dataForm: {
        id: 0,
        username: '',
        password: '',
        comfirmPassword: '',
        email: '',
        mobile: '',
        school: '',
        address: '',
        sex: 0,
        roleIds: []
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
        email: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      let params = {
        'id': Number(localStorage.getItem('userId'))
      }
      const { data } = await this.$store.dispatch('getUserInfo', params)
      if (data && data.code === 200) {
        this.dataForm.id = data.data.id
        this.dataForm.username = data.data.username
        this.dataForm.password = data.data.password
        this.dataForm.comfirmPassword = data.data.password
        this.dataForm.email = data.data.email
        this.dataForm.mobile = data.data.mobile
        this.dataForm.school = data.data.school
        this.dataForm.address = data.data.address
        this.dataForm.sex = data.data.sex
        this.dataForm.roleIds = data.data.roleIds
      }
    },
    // 表单提交
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
            'roleIds': this.dataForm.roleIds
          }
          const { data } = await this.$store.dispatch('updateUser', params)
          if (data && data.code === 201) {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getUserInfo()
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

<style lang="scss" scoped>
.userinfo {
  padding: 10px;
  background-color: #ffffff;
}
</style>
