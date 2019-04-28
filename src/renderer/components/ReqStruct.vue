<template>
  <div class="tree-field">
    <div v-for="(item,index) in content" :key="item.nanoid">
      <p class="item-title">{{item.name}}</p>
      <div v-for="(field,idx) in item.fieldList" :key="field.nanoid">
        <el-row :gutter="10">
          <el-col class="indent" :span="6">
            <el-tooltip class="pd-0" effect="dark" :content="field.name" placement="top">
              <el-input size="mini" placeholder="字段名" v-model="field.name"></el-input>
            </el-tooltip>
          </el-col>
          <el-col :span="5">
            <el-tooltip class="pd-0" effect="dark" :content="field.type" placement="top">
              <el-input size="mini" placeholder="类型" v-model="field.type"></el-input>
            </el-tooltip>
          </el-col>
          <el-col :span="11">
            <el-tooltip class="pd-0" effect="dark" :content="field.desc" placement="top">
              <el-input size="mini" placeholder="备注" v-model="field.desc"></el-input>
            </el-tooltip>
          </el-col>
          <!-- <el-col class="input" :span="3">
            <el-select size="mini" v-model="item.isRequired" placeholder="是否必传" v-if="item.isRequired === true || item.isRequired === false">
              <el-option label="必传" :value="true"></el-option>
              <el-option label="非必传" :value="false"></el-option>
            </el-select>
            <el-input size="mini" placeholder="" disabled v-else></el-input>
          </el-col> -->
          <el-col :span="1" class="btns">
            <i class="el-icon-close" @click="removeField(index, idx)"></i>
            <i class="el-icon-plus" @click="addField(index)"></i>
          </el-col>
        </el-row>
      </div>
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
    addField(index) {
      const _item = {
        desc: "",
        isList: false,
        name: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        type: "",
      };
      this.content[index].fieldList.push(_item);
    },
    removeField(index, idx) {
      this.content[index].fieldList.splice(idx, 1);
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
