<template>
  <div class="base-info-container">

      <div class="layout">
        <div class="title">
          <span>基本设置</span>
        </div>

        <el-row :gutter="20">
          <el-col class="input" :span="12">
            <el-form-item label="接口名称" prop="baseInfo.methodName">
              <el-input size="mini" v-model="info.methodName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="input" :span="12">
            <el-form-item label="接口描述" prop="baseInfo.description">
              <el-input size="mini" v-model="info.description" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col class="input" :span="12">
            <el-form-item label="项目负责" prop="baseInfo.groupOwner">
              <el-input size="mini" v-model="info.groupOwner" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="input" :span="12">
            <el-form-item label="接口负责" prop="baseInfo.methodOwner">
              <el-input size="mini" v-model="info.methodOwner" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col class="input" :span="12">
            <el-form-item label="接口状态" prop="baseInfo.state">
              <el-select size="mini" v-model="info.state" placeholder="请选择接口状态">
                <el-option label="OPEN" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="input" :span="12">
            <el-form-item label="安全级别" prop="baseInfo.securityLevel">
              <el-radio border size="mini" v-model="info.securityLevel" label="Anonym">Anonym</el-radio>
              <el-radio border size="mini" v-model="info.securityLevel" label="User">User</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col class="input" :span="24">
            <el-form-item label="调用后端">
              <el-input size="mini" v-model="info.mt" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </div>

  </div>
</template>

<script>
export default {
  name: "baseInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {

    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.base-info-container {
  width: 100%;
  .el-form-item,
  .el-select {
    width: 100%;
  }
  .el-radio {
    background: $white;
    margin-right: 10px;
  }
  .title {
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 16px;
    border-bottom: 1px solid #409eff;
    display: flex;
    align-items: center;
    & > span {
      margin-right: 20px;
    }
  }
  .el-form-item__content,
  .el-form-item__label {
    line-height: 30px;
  }
}
</style>
