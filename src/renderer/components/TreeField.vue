<template>
  <div class="tree-field">
    <div v-for="(item, index) in content" :key="item.nanoid">
      <!-- <p class="dynamicEntityName" v-if="type=='dynamic'">{{item.entity}}</p> -->
      <el-row :gutter="10">
        <el-col class="indent" :span="8" :style="{paddingLeft:`${depth * 30}px`}">
          <i :class="[`el-icon-caret-${item.showChild?'top':'bottom'}`]" v-if="item.nodes.length" @click="toggleShowChild(item)"></i>
          <i v-else></i>
          <el-input size="mini" placeholder="字段名" v-model="item.entity" v-if="type == 'dynamic'"></el-input>
          <el-input size="mini" placeholder="字段名" v-model="item.name" v-else></el-input>
        </el-col>
        <el-col :span="7">
          <el-input size="mini" placeholder="类型" value="Api_DynamicEntity" v-if="type == 'dynamic'" disabled></el-input>
          <div v-else>
            <el-input size="mini" placeholder="类型" v-model="item.type" v-if="!item.nodes.length || !item.type"></el-input>
            <el-tooltip class="pd-0" effect="dark" :content="item.type" placement="top" v-if="item.type && item.nodes.length">
              <el-input size="mini" placeholder="类型" v-model="item.type">
                <i slot="suffix" class="el-input__icon el-icon-warning" v-if="item.isList"></i>
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="7">
          <el-input size="mini" placeholder="备注" value="动态类型" v-if="type == 'dynamic'" disabled></el-input>
          <div v-else>
            <el-input size="mini" placeholder="备注" v-model="item.desc" v-if="!item.desc"></el-input>
            <el-tooltip class="pd-0" effect="dark" :content="item.desc" placement="top" v-else>
              <el-input size="mini" placeholder="备注" v-model="item.desc"></el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="2" class="btns">
          <i class="el-icon-close" v-if="depth > 0 || content.length > 1" @click="removeField(index)"></i>
          <el-tooltip class="pd-0" effect="dark" :content="tooltip(item.type).text" placement="top" v-if="depth > 0 || content.length > 1">
            <el-button type="text" icon="el-icon-plus" @click="addField(item, index)"></el-button>
          </el-tooltip>
          <el-dropdown @command="addField(item, index, $event)" v-else>
            <el-button type="text" icon="el-icon-plus"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="sibling">添加兄弟节点</el-dropdown-item>
              <el-dropdown-item command="child" v-if="isObject(item.type)">添加子节点</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <div class="children" v-if="item.nodes.length" v-show="item.showChild">
        <treeField :content="item.nodes" :depth="depth + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import nanoid from 'nanoid';
export default {
  name: "treeField",
  props: {
    content: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: 'normal'
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    toggleShowChild(item) {
      item.showChild = !item.showChild;
    },
    addField(item, index, command) {
      const _item = {
        desc: "",
        isList: false,
        name: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        showChild: true,
        nodes: [],
        type: "string",
        entity: item.entity
      };
      const tag = command || this.tooltip(item.type).tag;
      if(tag === 'child') {
        this.content[index].showChild = true;
        item.nodes.push(_item);
      } else {
        this.content.splice(index + 1, 0, _item);
      }
    },
    removeField(index) {
      this.content.splice(index, 1);
    },
    // 判断类型是否是对象
    isObject(type) {
      const test = /^Api_/ig.test(type) ||
                   /^list\[/ig.test(type) ||
                   type == 'array' ||
                   type == 'object';
      return test;
    },
    // 判断是否是子节点，用于判断添加字段时的逻辑处理
    tooltip(type) {
      const test = this.isObject(type);
      return test ? {tag: 'child', text: '添加子节点'} : {tag: 'sibling', text: '添加兄弟节点'};
    },
    editIsList(item) {
      item.isList = /^list\[(\w+)\]$/ig.test(item.type) ? true : false;
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
