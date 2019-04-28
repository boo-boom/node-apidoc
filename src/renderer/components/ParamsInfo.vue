<template>
  <div class="tree-field">
    <div v-for="(item,index) in content" :key="item.nanoid">
      <el-row :gutter="10">
        <el-col class="indent" :span="6">
          <el-tooltip class="pd-0" effect="dark" :content="item.name" placement="top">
            <el-input size="mini" placeholder="字段名" v-model="item.name"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-tooltip class="pd-0" effect="dark" :content="item.type" placement="top">
            <el-input size="mini" placeholder="类型" v-model="item.type"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <el-tooltip class="pd-0" effect="dark" :content="item.description" placement="top">
            <el-input size="mini" placeholder="备注" v-model="item.description"></el-input>
          </el-tooltip>
        </el-col>
        <el-col class="input" :span="3">
          <el-select size="mini" v-model="item.isRequired" placeholder="是否必传" v-if="item.isRequired === true || item.isRequired === false">
            <el-option label="必传" :value="true"></el-option>
            <el-option label="非必传" :value="false"></el-option>
          </el-select>
          <el-input size="mini" placeholder="" disabled v-else></el-input>
        </el-col>
        <el-col :span="1" class="btns">
          <i class="el-icon-close" v-if="content.length > 1" @click="removeField(item, index)"></i>
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
      type: Array,
      default() {
        return [];
      }
    },
  },
  methods: {
    addField(item, index) {
      const _item = {
        description: "",
        injectOnly: false,
        isList: false,
        isRequired: true,
        isRsaEncrypt: false,
        name: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        sequence: "",
        type: "string"
      };
      this.content.push(_item);
    },
    removeField(item, index) {
      if(this.isObject(item.type)) {
        this.$confirm(`需手动删除该实体下的字段，确定删除${item.type}?`, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.content.splice(index, 1);
          this.$message({
            type: 'success',
            message: `${item.type}删除成功!`
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.content.splice(index, 1);
      }
      // this.$emit('removeChild', item.type, index);
    },
     // 判断类型是否是对象
    isObject(type) {
      const test = /^Api_/ig.test(type) ||
                   /^list\[/ig.test(type) ||
                   type == 'array' ||
                   type == 'object';
      return test;
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
