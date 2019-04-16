<template>
  <div>
    <el-form :model="dataForm" ref="dataForm" :rules="dataRule" label-width="80px">
      <el-upload
        class="avatar-uploader a-c"
        :headers="{token}"
        action="/api/image/upload"
        :on-success = "handleSuccess"
        :on-remove="handleRemove">
        <img v-if="dataForm.imageUrl" :src="dataForm.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="typeId">
        <el-select v-model="dataForm.typeId" filterable clearable placeholder="请选择">
            <el-option
              v-for="index in typeList"
              :key="index.id"
              :label="index.name"
              :value="index.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="dataForm.price" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="商品原价" prop="originalPrice">
        <el-input-number v-model="dataForm.originalPrice" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="商品数量" prop="number">
        <el-input-number v-model="dataForm.number" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="新旧程度" prop="degree">
        <el-select v-model="dataForm.degree" filterable allow-create default-first-option placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.id" label="发布时间" prop="releaseTime">
        <el-input v-model="dataForm.releaseTime" placeholder="发布时间"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.id" label="是否下架" prop="undercarriage">
        <el-radio-group v-model="dataForm.undercarriage">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="dataForm.description" type="textarea" placeholder="商品描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="publish()">确定</el-button>
    </span>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      token: Cookies.get('token'),
      typeList: [],
      localItem: Number(localStorage.getItem('userId')),
      dataForm: {
        id: 0,
        goodsCode: '',
        name: '',
        originalPrice: '',
        price: '',
        number: '',
        imageName: '',
        imageUrl: '',
        degree: '',
        undercarriage: '',
        description: '',
        userId: '',
        typeId: ''
      },
      options: [{
        value: '全新',
        label: '全新'
      }, {
        value: '九成新',
        label: '九成新'
      }, {
        value: '八成新',
        label: '八成新'
      }, {
        value: '七成新',
        label: '七成新'
      }, {
        value: '六成新',
        label: '六成新'
      }, {
        value: '五成新',
        label: '五成新'
      }],
      dataRule: {
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '商品类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    handleSuccess (response, file, fileList) {
      this.dataForm.imageUrl = response.data.imageUrl
      this.dataForm.imageName = response.data.imageName
      this.$message({
        message: '上次图片成功',
        type: 'success',
        duration: 1000
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.dataForm.imageUrl = ''
      this.$message({
        message: '删除图片成功',
        type: 'success',
        duration: 1000
      })
    },
    // 获取类型列表
    async getTypeList () {
      const { data } = await this.$store.dispatch('getGoodstype')
      if (data && data.code === 200) {
        this.typeList = data.data || []
      }
    },
    // 获取信息
    getInfo () {
      this.$http.get(`${window.SITE_CONFIG['baseURL']}/api/goodses/${this.dataForm.id}`).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm.goodsCode = data.data.goodsCode
          this.dataForm.name = data.data.name
          this.dataForm.originalPrice = data.data.originalPrice
          this.dataForm.price = data.data.price
          this.dataForm.number = data.data.number
          this.dataForm.imageUrl = data.data.imageName
          this.dataForm.degree = data.data.degree
          this.dataForm.undercarriage = data.data.undercarriage
          this.dataForm.description = data.data.description
          this.dataForm.userId = data.data.userId
          this.dataForm.typeId = data.data.typeId
        }
      })
    },
    publish () {
      this.$refs['dataForm'].validate(async (valid) => {
        if (valid) {
          let params = {
            'id': this.dataForm.id,
            'name': this.dataForm.name,
            'originalPrice': this.dataForm.originalPrice,
            'price': this.dataForm.price,
            'number': this.dataForm.number,
            'imageName': this.dataForm.imageName,
            'degree': this.dataForm.degree,
            'undercarriage': 0,
            'auditStatus': 0,
            'description': this.dataForm.description,
            'typeId': this.dataForm.typeId
          }
          let data = {}
          if (this.dataForm.id === 0) {
            data = await this.$store.dispatch('publish', params)
          } else {
            data = await this.$store.dispatch('updateGoods/{this.dataForm}', params)
          }
          if (data && data.code === 201) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000
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

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
