<template>
  <div class="home-container">
    <div class="left">
      <el-input type="textarea" resize="none" :rows="2" placeholder="请将apiDoc粘贴至此" v-show="!editIsJson" v-model="apiDocStr"></el-input>
      <div id="javascript-editor" v-show="editIsJson"></div>
      <el-button class="json-doc" size="small" type="warning" icon="el-icon-upload2"  @click="typeTab">{{editIsJson?'JSON模式':'DOC模式'}}</el-button>
      <el-button class="transform-doc" size="small" type="primary" :icon="showTfLoading?'el-icon-loading':'el-icon-sort'" @click="docToJson(editIsJson)"> 文档转换</el-button>
      <el-button class="generate-doc" size="small" type="danger" :icon="showGeLoading?'el-icon-loading':'el-icon-download'" :disabled="!docLoadDone" @click="jsonToDoc"> 文档生成</el-button>
    </div>
    <div class="right">
      <div v-if="docLoadDone">
        <!-- 基础信息 -->
        <el-form :model="lastObject" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <BaseInfo v-if="JSON.stringify(lastObject.baseInfo)!='{}'" :info="lastObject.baseInfo"/>
        </el-form>
        <!-- 请求参数 -->
        <div class="title">
          <span>请求参数</span>
          <el-button size="mini" type="warning" icon="el-icon-upload2" @click="addParam">添加参数</el-button>
        </div>
        <ParamsInfo v-if="lastObject.params.length" :content="lastObject.params" :depth="0"/>
        <!-- 返回数据 -->
        <div class="title" style="paddingTop:20px;" v-if="lastObject.respStructList.length">
          <span>返回数据</span>
        </div>
        <div class="json-view" v-if="lastObject.respStructList.length">
          <ul class="json-title">
            <el-row :gutter="10">
              <el-col :span="11" class="indent">字段名</el-col>
              <el-col :span="7">类型</el-col>
              <el-col :span="4">描述</el-col>
              <el-col :span="2">操作</el-col>
            </el-row>
          </ul>
          <tree-field :content="lastObject.respStructList" :depth="0" />
          <!-- 动态实体 -->
          <div v-if="lastObject.dynamicEntity.length">
            <div class="title" style="paddingTop:20px;">
              <span>动态实体 [谨慎修改]</span>
            </div>
            <tree-field type="dynamic" :content="lastObject.dynamicEntity" :depth="0" />
          </div>
          <!-- error -->
          <div class="title" style="paddingTop:20px;">
            <span>Error</span>
            <el-button size="mini" type="warning" icon="el-icon-upload2" @click="addCode">添加code</el-button>
          </div>
          <error-info v-if="lastObject.error.length" :content="lastObject.error" />
        </div>
      </div>

      <div class="doc-load" v-else>
        <div class="desc" v-if="!showTfLoading">
          <i class="el-icon-warning"></i>
          <p class="text">请在左侧粘贴网关生成的apidoc内容</p>
        </div>
        <i class="el-icon-loading" v-else></i>
      </div>

    </div>

    <el-dialog title="修改文件名" :visible.sync="dialogFormVisible">
      <el-input v-model="docFileName" autocomplete="off">
        <template slot="append">.js</template>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDocToFile">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import apiDocStr from './../../../static/apiDoc.js';
const path = require('path');
const fs = require('fs');
const { fomartJson } = require('@/assets/utils/docJsonFormat')
const filePath = path.resolve(__dirname, '../../../static/example/apiDocStr.js');
import { saveDoc } from '@/assets/utils/saveDoc.js';
import { remote } from "electron";
import nanoid from 'nanoid';
import generateSchema from "generate-schema/src/schemas/json.js";
import ace from "brace";
import "brace/mode/json";
import { createDoc } from "@/assets/utils/parser.js";
import { nodeType, methodName, isEntity } from "@/assets/utils/nodes.js";
import BaseInfo from '@/components/BaseInfo';
import ParamsInfo from '@/components/ParamsInfo';
import TreeField from "@/components/TreeField";
import ErrorInfo from "@/components/ErrorInfo";

export default {
  name: "home-container",
  components: { BaseInfo, ParamsInfo, TreeField, ErrorInfo },
  data() {
    const verApiName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入接口名称"));
      }
      if (!/^node_(\w+\.[a-zA-Z0-9]+)$/gi.test(value)) {
        return callback(new Error("接口名格式错误"));
      }
      callback();
    };
    return {
      apiDocStr: '',        // 获取复制在左侧的文档
      showTfLoading: false, // 正在转换文档
      showGeLoading: false, // 是否可以生成文档
      docPath: '',          // 保存的路径
      docToFile: '',        // 转换成apiDoc所需要的数据
      allEntityName: [],    // 全部动态实体名
      entityName: [],       // 非动态实体名
      dynamicEntity: [],    // 动态实体名
      editIsJson: false,    // 是否是导入json
      editor: null,         // json编辑器
      jsonState: null,      // 导入json后数据状态
      docFileName: '',      // 保存文档时的文件名
      dialogFormVisible: false, // 保存文档时输入文件名的dialog
      lastObject: {         // 最后完成的数据
        baseInfo: {},
        params: [],
        respStructList: [],
        dynamicEntity: [],
        error: []
      },
      rules: {
        'baseInfo.methodName': [{ required: true, validator: verApiName, trigger: "change" }],
        'baseInfo.description': [{ required: true, message: "请输入接口描述", trigger: "change" }],
        'baseInfo.groupOwner': [{ required: true, message: "请输入负责组长", trigger: "change" }],
        'baseInfo.methodOwner': [{ required: true, message: "请输入接口负责", trigger: "change" }],
        'baseInfo.securityLevel': [{ required: true, message: "请选择安全等级", trigger: "change" }],
        'baseInfo.state': [{ required: true, message: "请输入接口状态", trigger: "change" }]
      }
    }
  },
  mounted() {
    this.apiDocStr = apiDocStr;
    this.$nextTick(() => {
      if (!this.editor) {
        this.editor = ace.edit("javascript-editor");
        this.editor.getSession().setMode("ace/mode/json");
        this.editor.getSession().on("change", e => {
          // 捕获json格式错误信息
          const jsonState = {};
          try {
            const value = this.editor.getValue();
            const obj = JSON.parse(value);
            jsonState.data = obj;
            jsonState.format = true;
          } catch (err) {
            jsonState.format = false;
            jsonState.forat = err.message;
          }
          this.jsonState = jsonState;
          this.editor.clearSelection();
        });
      }
    });
  },
  // watch: {
  //   lastObject: {
  //     deep: true,
  //     handler(val, oldVal) {
  //       console.log(val.params)
  //     }
  //   }
  // },
  computed: {
    // 文档转化结束
    docLoadDone() {
      if(!this.editIsJson) {
        if(JSON.stringify(this.lastObject.baseInfo) === '{}' || !this.lastObject.respStructList.length) {
          return false
        }
      } else {
        if(!this.lastObject.respStructList.length) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    // 转换文档
    docToJson(isJson) {
      this.showTfLoading = true;
      if(isJson) {
        const editorValue = this.editor.getValue();
        if (editorValue) {
          if (!this.jsonState.format) {
            this.$notify.error({
              title: "错误",
              message: `json数据格式有误：${this.jsonState.forat}`
            });
          } else {
            this.jsonState.schema = generateSchema(this.jsonState.data);
            this.lastObject.respStructList = this.getJsonSchemaTree(this.jsonState.schema.properties);
            this.lastObject.baseInfo = {
              methodName: '',
              description: '',
              groupOwner: '',
              methodOwner: '',
              securityLevel: '',
              state: ''
            };
            this.lastObject.params = [{
              description: "请求参数",
              injectOnly: false,
              isList: false,
              isRequired: true,
              isRsaEncrypt: false,
              name: "",
              nodes: [],
              sequence: "",
              type: "string",
            }];
            // console.log(this.getJsonSchemaTree(this.jsonState.schema.properties))
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "json不能为空"
          });
        }
        this.showTfLoading = false;
      } else {
        // 写入文件
        fs.writeFile(filePath, this.apiDocStr, (err) => {
          this.showTfLoading = false;
          if(err) {
            console.log(err.message)
            return
          }
          createDoc({
            cb: api_data => {
              if(!api_data) {
                this.$message.error("文档格式出错");
              } else {
                // 获取错误字段
                this.lastObject.error = [];
                if(api_data[0].error && api_data[0].error.fields) {
                  for(let key in api_data[0].error.fields) {
                    api_data[0].error.fields[key].forEach(item => {
                      item.nanoid = nanoid();
                    })
                    this.lastObject.error = this.lastObject.error.concat(api_data[0].error.fields[key])
                  }
                }

                fomartJson(api_data, infoJson => {
                  const curApi = infoJson.apiList[0];
                  // 获取初始化数据
                  this.lastObject.baseInfo = {
                    methodName: curApi.methodName,
                    description: curApi.description,
                    groupOwner: curApi.groupOwner,
                    methodOwner: curApi.methodOwner,
                    state: curApi.state,
                    securityLevel: curApi.securityLevel,
                    detail: curApi.detail,
                    encryptionOnly: curApi.encryptionOnly,
                    needVerify: curApi.needVerify,
                    returnType: curApi.returnType,
                  }
                  // 获取参数
                  this.lastObject.params = [];
                  for(let i = 0; i < curApi.parameterInfoList.length; i++) {
                    curApi.parameterInfoList[i].nodes = [];
                    this.lastObject.params.push({
                      ...curApi.parameterInfoList[i],
                      isParame: true,
                      desc: curApi.parameterInfoList[i].description,
                      nanoid: nanoid(),
                      entity: isEntity(curApi.parameterInfoList[i].type)
                              ? curApi.parameterInfoList[i].type
                              : '',
                    })
                    if(curApi.reqStructList.length) {
                      this.$set(this.lastObject.params[i], 'nodes', this.getJsonTree(curApi.reqStructList, this.lastObject.params[i].type), true);
                    }
                    if(isEntity(curApi.parameterInfoList[i].type)) {
                      this.lastObject.params[i].type = curApi.parameterInfoList[i].type;
                    }
                  }
                  // 获取返回数据
                  this.lastObject.respStructList = this.getJsonTree(curApi.respStructList, curApi.returnType);
                  // 获取动态实体
                  this.lastObject.dynamicEntity = this.getDynamicEntity(curApi.respStructList);
                  this.$message({
                    showClose: true,
                    message: "创建转换成功",
                    type: "success"
                  });
                });
              }
            }
          });
        })
      }
    },
    // 获取修改后的文档
    jsonToDoc() {
      this.showGeLoading = true;
      console.log(this.lastObject)
      remote.dialog.showOpenDialog(
        {
          title: "选择当前文档所需存放的目录",
          properties: ["openDirectory"],
        },
        filePaths => {
          if (filePaths) {
            this.showGeLoading = false;
            const { doc, methodName} = saveDoc(this.lastObject, this.dynamicEntity);
            this.dialogFormVisible = true;
            this.docFileName = methodName;
            this.docPath = filePaths[0];
            this.docToFile = doc.replace(/\s+\*\s/, ' *');
          }
        }
      );
    },
    // 保存修改后文档至文件中
    saveDocToFile() {
      this.docPath = `${this.docPath}/${this.docFileName}.js`;
      if(/\.js$/.test(this.docPath)) {
        this.dialogFormVisible = false;
        if (fs.existsSync(this.docPath)) {
          this.$confirm('该文件已存在, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            fs.writeFileSync(this.docPath, this.docToFile);
            this.$message({
              type: 'success',
              message: '覆盖成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消覆盖'
            });
          });
        } else {
          this.$confirm('是否创建该文件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            fs.writeFileSync(this.docPath, this.docToFile);
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消创建'
            });
          });
        }
      } else {
        this.$notify.error({
          title: "错误",
          message: '文件名错误'
        });
      }
      // console.log(this.docPath, this.docFileName, this.docToFile)
    },
    // 切换状态
    typeTab() {
      this.editIsJson = !this.editIsJson;
    },
    // 获取动态实体
    getDynamicEntity(data) {
      // 获取哪些是动态组件，没有匹配到type===name的为动态组件
      // 这里使用减法获取到动态组件，获取到全部组件名-已经匹配到到组件名=动态组件
      const _dynamicEntity = [];
      this.allEntityName.forEach(item => {
        if(!this.entityName.includes(item)) {
          data.forEach(field => {
            if(field.name === item) {
              _dynamicEntity.push(field)
              this.dynamicEntity.push(field.name)
            }
          });
        }
      })
      // console.log(dynamicEntity)
      // format动态组件结构
      const dynamicEntityList = [];
      if(_dynamicEntity.length) {
        for (let i = 0; i < _dynamicEntity.length; i++) {
          const node = _dynamicEntity[i];
          dynamicEntityList[i] = ({
            isDynamic: true,
            nanoid: nanoid(),
            showChild: false,
            entity: node.name,
            nodes: this.getJsonTree(data, node.name, true),
          });
        }
      }
      // console.log(dynamicEntityList)
      return dynamicEntityList;
    },
    // 将平铺数据转换成树状结构
    getJsonTree(data, type, openGetName=false) {
      const itemArr = [];
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if(!openGetName) {
          // 获取全部实体名
          if(this.allEntityName.indexOf(node.name) < 0) {
            this.allEntityName.push(node.name);
          }
        }
        if (node.name == type) {
          for (let j = 0; j < node.fieldList.length; j++) {
            const _nodeType = node.fieldList[j].type;
            if(!openGetName) {
              // 已经匹配到type的实体
              if(this.entityName.indexOf(node.name) < 0) {
                this.entityName.push(node.name);
              }
            }
            const newNode = {
              ...node.fieldList[j],
              nanoid: nanoid(),
              showChild: false,
              entity: type,
              type: node.fieldList[j].isList
                ? `List[${node.fieldList[j].type}]`
                : node.fieldList[j].type,
              nodes: this.getJsonTree(data, _nodeType)
            };
            itemArr.push(newNode);
          }
        }
      }
      return itemArr;
    },
    // 将SchemaJson进行处理
    getJsonSchemaTree(data) {
      const newData = [];
      for (let key in data) {
        let curNodes = [];
        const type = data[key]["type"];
        const newNode = {
          name: key,
          type: type,
          isList: type === "array",
          desc: "",
          nanoid: nanoid(),
          showChild: false,
          nodes:
            type == "array"
              ? this.getJsonSchemaTree(data[key].items.properties)
              : this.getJsonSchemaTree(data[key].properties)
        };
        newData.push(newNode);
      }
      return newData;
    },
    // 添加code
    addCode() {
      const _item = {
        description: "",
        field: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        group: "Error_msg",
        optional: false,
        type: ""
      };
      this.lastObject.error.push(_item)
    },
    // 添加请求参数
    addParam() {
      const _item = {
        desc: "",
        description: "",
        entity: "",
        injectOnly: false,
        isList: false,
        isParame: true,
        isRequired: true,
        isRsaEncrypt: false,
        name: `Field_${nanoid(5)}`,
        nanoid: nanoid(),
        nodes: [],
        sequence: "",
        type: "string",
      };
      this.lastObject.params.push(_item)
    },
  }
};
</script>

<style lang="scss">
.home-container {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  .left {
    width: 30%;
    position: relative;
    #javascript-editor {
      height: 100%;
    }
    .transform-doc {
      width: 110px;
      position: absolute;
      top: 32px;
      right: 0;
      z-index: 9;
      border-radius: 0;
    }
    .json-doc {
      width: 110px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9;
      border-radius: 0;
    }
    .generate-doc {
      width: 110px;
      position: absolute;
      top: 64px;
      right: 0;
      z-index: 9;
      border-radius: 0 0 0 5px;
    }
    .el-textarea {
      height: 100vh;
      .el-textarea__inner {
        border-radius: 0;
        border: none;
        height: 100%;
      }
    }
  }
  .right {
    width: 70%;
    padding: 15px;
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .title {
      margin-bottom: 20px;
      padding-bottom: 10px;
      font-size: 16px;
      border-bottom: 1px solid #409eff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span {
        margin-right: 20px;
      }
    }
    .json-view {
      padding-bottom: 20px;
      .json-title {
        .indent {
          padding-left: 20px !important;
        }
        color: #444;
        font-size: 14px;
        padding-bottom: 15px;
      }
    }
    .doc-load {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .desc {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $gray_3;
        & > i {
          padding-right: 10px;
        }
      }
    }
    .dynamic-entity-title {
      font-size: 14px;
    }
  }
}
</style>


