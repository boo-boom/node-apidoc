<template>
  <div class="tree-field">
    <div v-for="(item,index) in content.parameter" :key="item.nanoid">
      <p class="item-title">{{item.type}}</p>
      <el-row :gutter="10">
        <el-col class="indent" :span="6">
          <el-input size="mini" placeholder="字段名" v-model="item.name"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input size="mini" placeholder="类型" v-model="item.type"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input size="mini" placeholder="备注" v-model="item.description"></el-input>
        </el-col>
        <el-col class="input" :span="4">
          <el-select size="mini" v-model="item.isRequired" placeholder="是否必传" v-if="item.isRequired === true || item.isRequired === false">
            <el-option label="必传" :value="true"></el-option>
            <el-option label="非必传" :value="false"></el-option>
          </el-select>
          <el-input size="mini" placeholder="" disabled v-else></el-input>
        </el-col>
        <el-col :span="2" class="btns">
          <i class="el-icon-close" @click="removeField(item, index)"></i>
          <i class="el-icon-plus" @click="addField(item, index)"></i>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import nanoid from 'nanoid';
export default {
  name: "paramsInfo",
    props: {
    content: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  methods: {
    addField(item, index) {
      const _item = {
        desc: "",
        isList: false,
        name: `Field_${nanoid(5)}`,
        type: "",
      };
      item.fieldList.splice(index + 1, 0, _item);
    },
    removeField(item, index) {
      item.fieldList.splice(index, 1);
    },
  }
};
</script>

<style lang="scss" scoped>
.tree-field {
  .item-title {
    font-size: 13px;
    padding: 0 0 5px 0;
  }
  .pd-0 {
    padding: 0;
  }
  .el-input__icon {
    color: $warning;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .indent {
    display: flex;
    align-items: center;
    & > i {
      width: 22px;
    }
  }
  .btns {
    display: flex;
    align-items: center;
    height: 28px;
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
