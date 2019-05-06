<template>
  <div class="tree-field">
    <div v-for="(item, index) in content" :key="item.nanoid">
      <el-row :gutter="10">
        <el-col class="input" :span="4">
          <el-select size="mini" v-model="item.group" placeholder="是否定义">
            <el-option label="Error" value="Error"></el-option>
            <el-option label="Error_msg" value="Error_msg"></el-option>
          </el-select>
        </el-col>
        <el-col class="indent" :span="6">
          <el-input size="mini" placeholder="字段名" v-model="item.field"></el-input>
        </el-col>
        <el-col :span="7">
          <el-input size="mini" placeholder="类型" v-model="item.type"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" placeholder="备注" v-model="item.description"></el-input>
        </el-col>
        <el-col :span="1" class="btns">
          <i class="el-icon-close" @click="removeField(index)"></i>
          <i class="el-icon-plus" @click="addField(item, index)"></i>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import nanoid from 'nanoid';
export default {
  name: "errorInfo",
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
        field: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        group: "Error_msg",
        optional: false,
        type: ""
      };
      this.content.push(_item);
    },
    removeField(index) {
      this.content.splice(index, 1);
    },
  }
};
</script>

<style lang="scss" scoped>
.tree-field {
  .dynamicEntityName {
    font-size: 13px;
    padding: 0 0 5px 20px;
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
