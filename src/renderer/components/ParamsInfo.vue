<template>
  <div class="params-info-container">
    <div class="layout">
      <div class="title">
        <span>请求参数</span>
      </div>
      <el-row :gutter="10" v-for="(param,index) in info" :key="index">
        <el-col class="input" :span="6">
          <el-form-item label-width="0" prop="paramName">
            <el-input size="mini" v-model="param.name" placeholder="参数描述"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="input" :span="4">
          <el-form-item label-width="0" prop="paramName">
            <el-input size="mini" v-model="param.type" placeholder="参数类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="input" :span="8">
          <el-form-item label-width="0" prop="paramName">
            <el-input size="mini" v-model="param.description" placeholder="参数描述"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="input" :span="4">
          <el-form-item label-width="0" prop="paramName">
            <el-select size="mini" v-model="param.isRequired" placeholder="是否必传">
              <el-option label="必传" :value="true"></el-option>
              <el-option label="非必传" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="input" :span="2">
          <div class="btns">
            <i class="el-icon-close"></i>
            <i class="el-icon-plus"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "paramsInfo",
  props: {
    info: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.params-info-container {
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

  .btns {
    display: flex;
    align-items: center;
    height: 28px;
    margin-top: 5px;
    & > i {
      margin-right: 10px;
    }
    .el-icon-close {
      color: $danger;
      cursor: pointer;
    }
    .el-icon-plus {
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
