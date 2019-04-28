<template>
  <div class="tree-field" id="treeField" ref="treeField">
    <div v-for="item in content" :key="item.nanoid">
      <p class="item-title">{{item.name}}</p>
      <el-row :gutter="5" v-for="(field, idx) in item.fieldList" :key="field.nanoid">
        <el-col class="indent" :span="6">
          <el-tooltip class="pd-0" effect="dark" :content="field.name" placement="top">
            <el-input size="mini" placeholder="字段名" v-model="field.name"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="9">
          <el-tooltip class="pd-0" effect="dark" :content="field.type" placement="top">
            <el-input size="mini" placeholder="类型" v-model="field.type"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="7">
          <el-tooltip class="pd-0" effect="dark" :content="field.desc" placement="top">
            <el-input size="mini" placeholder="备注" v-model="field.desc"></el-input>
          </el-tooltip>
        </el-col>
        <el-col :span="1" class="btns">
          <i class="el-icon-close" @click="removeField(item, idx)"></i>
          <i class="el-icon-plus" @click="addField(item, idx)"></i>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import nanoid from 'nanoid';
import { remote, ipcRenderer } from 'electron';
import { FindInPage } from 'electron-find';
export default {
  name: "treeField",
  props: {
    content: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      findInPage: null
    }
  },
  destroyed() {
    this.findInPage.destroy()
  },
  mounted() {
    this.$nextTick(() => {
      if(!this.findInPage) {
        setTimeout(() => {
          this.findInPage = new FindInPage(remote.getCurrentWebContents(), {
            preload: true,
            parentElement: this.$refs.treeField
          })
          this.findInPage.openFindWindow()
        }, 1000)
      }
      console.log(this.$refs.treeField)
    })
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
      console.log(item)
      item.fieldList.splice(index, 1);
    },
    recursiveField(fieldList, type) {

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
