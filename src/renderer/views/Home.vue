<template>
  <div class="home-container">
    <div class="code-edit" v-if="!editorSuccess">
      <editor v-model="apiDocStr" @init="editorInit" ref="myEditor" lang="javascript" theme="dreamweaver" width="100%" height="100%"></editor>
      <!-- editor-serarch -->
      <el-input class="editor-search" size="mini" placeholder="search..." v-model="editorSearch" @keyup.enter.native="editorFind">
        <i class="el-input__icon" slot="suffix" @click="editorFindAll">ALL</i>
      </el-input>
    </div>
    <div class="btns-group">
      <!-- <el-button class="json-doc" size="small" type="warning" icon="el-icon-upload2" @click="typeTab" v-show="!editorSuccess">{{editIsJson?'JSON模式':'DOC模式'}}</el-button> -->
      <el-button class="json-doc" size="small" type="warning" icon="el-icon-upload2" @click="backEdit" v-show="editorSuccess">修改apidoc</el-button>
      <el-button class="transform-doc" size="small" type="primary" :icon="showTfLoading?'el-icon-loading':'el-icon-sort'" @click="budleDocToJson" v-show="!editorSuccess"> 文档转换</el-button>
      <el-button class="generate-doc" size="small" type="danger" :icon="showGeLoading?'el-icon-loading':'el-icon-download'" :disabled="!docLoadDone" @click="jsonToDoc('ruleForm')" v-show="editorSuccess"> 文档生成</el-button>
    </div>
    <div class="json-tree-content scrollStyle">
      <div v-if="docLoadDone">
        <!-- 基础信息 -->
        <el-form :model="lastObject" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <BaseInfo v-if="JSON.stringify(lastObject.baseInfo)!='{}'" :info="lastObject.baseInfo"/>
        </el-form>
        <!-- 请求参数 -->
        <div class="title">
          <span>请求参数</span>
          <el-button size="mini" type="primary" icon="el-icon-upload2" @click="addParam">添加参数</el-button>
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
          <div>
            <div class="title" style="paddingTop:20px;">
              <span>动态实体 [谨慎修改]</span>
              <el-button size="mini" type="primary" icon="el-icon-upload2" @click="addDynamicEntity">添加实体</el-button>
            </div>
            <tree-field type="dynamic" :content="lastObject.dynamicEntity" :depth="0" v-if="lastObject.dynamicEntity.length"/>
          </div>
          <!-- error -->
          <div class="title" style="paddingTop:20px;">
            <span>Error</span>
            <el-button size="mini" type="primary" icon="el-icon-upload2" @click="addCode">添加code</el-button>
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

    <div class="prompt">
      <p>
        <i class="el-icon-warning"></i>
        <span>List类型</span>
      </p>
      <p>
        <i class="el-icon-question"></i>
        <span>实体内调用了该实体</span>
      </p>
    </div>

  </div>
</template>

<script>
import apiDocStr from './../../../static/test/apiDoc.js';
const path = require('path');
const fs = require('fs');
const { fomartJson } = require('@/assets/utils/docJsonFormat')
const filePath = path.join(__static, './example/apiDocStr.js');
import { saveDoc } from '@/assets/utils/saveDoc.js';
import { remote, ipcRenderer } from "electron";
import { FindInPage } from 'electron-find'
import nanoid from 'nanoid';
import generateSchema from "generate-schema/src/schemas/json.js";
import { createDoc } from "@/assets/utils/parser.js";
import { nodeType, methodName, isEntity } from "@/assets/utils/nodes.js";
import BaseInfo from '@/components/BaseInfo';
import ParamsInfo from '@/components/ParamsInfo';
import TreeField from "@/components/TreeField";
import ErrorInfo from "@/components/ErrorInfo";

export default {
  name: "home-container",
  components: { BaseInfo, ParamsInfo, TreeField, ErrorInfo, editor: require('vue2-ace-editor') },
  data() {
    const verApiName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入接口名称"));
      }
      if (!/^(\w+\.[a-zA-Z0-9]+)$/gi.test(value)) {
        return callback(new Error("接口名格式错误"));
      }
      callback();
    };
    return {
      apiDocStr: '',        // 获取复制在左侧的文档
      showTfLoading: false, // 正在转换文档
      showGeLoading: false, // 是否可以生成文档
      docPath: '',          // 保存的路径
      findInPage:  null,    // 搜索实例
      editorSearch: '',     // 编辑器界面时搜索内容
      editIsJson: false,    // 是否是导入json
      editorSuccess: false, // 编辑器是否完成编辑
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
  destroyed() {
    this.findInPage.destroy()
  },
  mounted() {
    this.apiDocStr = apiDocStr;
    this.$nextTick(() => {
      if(!this.findInPage) {
        this.findInPage = new FindInPage(remote.getCurrentWebContents(), {
          preload: true,
          offsetTop: 40,
          offsetRight: 10
        })
      }
      ipcRenderer.on('on-find', (e, args) => {
        if(this.editorSuccess) {
          this.findInPage.openFindWindow()
        } else {
          this.editorFind()
        }
      })
    })
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
    editorInit: function (editor) {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/javascript')    //language
        require('brace/mode/less')
        require('brace/theme/dreamweaver')
        require('brace/snippets/javascript') //snippet
    },
    editorFind() {
      let editor = this.$refs.myEditor.editor;
      editor.find(this.editorSearch);
      // console.log(this.editorSearch)
    },
    editorFindAll() {
      this.$nextTick(() => {
        let editor = this.$refs.myEditor.editor;
        editor.findAll(this.editorSearch);
      })
    },
    // 转换文档
    budleDocToJson() {
      if(this.lastObject.respStructList && this.lastObject.respStructList.length) {
        this.$confirm('是否重新转换数据?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.docToJson();
          this.$message({
            type: 'info',
            message: '已更新内容'
          });
        }).catch(() => {
          this.editorSuccess = true;
        });
      } else {
        this.docToJson();
      }
    },
    docToJson() {
      this.showTfLoading = true;
      if(!this.apiDocStr) {
        this.$notify.error({
          title: "错误",
          message: "数据不能为空"
        });
        this.showTfLoading = false;
        return
      }
      if(this.editIsJson) {
        let errMsg = '';
        let apiDocStr = {};
        try {
          apiDocStr = JSON.parse(this.apiDocStr);
        } catch(err) {
          errMsg = err.message;
        }
        if (errMsg) {
          this.$notify.error({
            title: "错误",
            message: `json数据格式有误：${errMsg}`
          });
        } else {
          this.jsonState = {};
          this.jsonState.schema = generateSchema(apiDocStr);
          this.lastObject.respStructList = this.getJsonSchemaTree(this.jsonState.schema.properties);
          this.lastObject.baseInfo = {
            title: "",
            groupOwner: "王柯迪",
            methodOwner: "",
            securityLevel: "Anonym",
            returnType: "",
            state: "OPEN",
            detail: null,
            encryptionOnly: false,
            needVerify: false
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
          this.editorSuccess = true;
          // console.log(this.lastObject)
        }
        this.showTfLoading = false;
      } else {
        // 写入文件
        this.editorSuccess = false;
        fs.writeFile(filePath, this.apiDocStr, (err) => {
          this.showTfLoading = false;
          if(err) {
            this.$notify.error({
              title: "错误",
              message: `写入文件错误：${err.message}`
            });
            return
          }
          try {
            eval(this.apiDocStr)
          } catch(err) {
            this.$notify.error({
              title: "错误",
              message: `数据格式有误：${err.message}`
            });
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
                    mt: curApi.mt
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
                      this.$set(this.lastObject.params[i], 'nodes', this.getJsonTree(curApi.reqStructList, this.lastObject.params[i].type));
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
                  this.editorSuccess = true;
                });
              }
            }
          })
        })
      }
    },
    // 获取修改后的文档
    jsonToDoc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showGeLoading = true;
          // console.log(this.lastObject)
          remote.dialog.showOpenDialog(
            {
              title: "选择当前文档所需存放的目录",
              properties: ["openDirectory"],
            },
            filePaths => {
              if (filePaths) {
                this.showGeLoading = false;
                const { doc, methodName } = saveDoc(this.lastObject);
                this.dialogFormVisible = true;
                this.docFileName = methodName;
                this.docPath = filePaths[0];
                this.apiDocStr = doc;
              }
            }
          );
        } else {
          this.$notify.error({
            title: "错误",
            message: "初始化错误!!"
          });
          return false;
        }
      });
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
            fs.writeFileSync(this.docPath, this.apiDocStr);
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
            fs.writeFileSync(this.docPath, this.apiDocStr);
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
      // console.log(this.docPath, this.docFileName, this.apiDocStr)
    },
    // 切换状态
    typeTab() {
      this.editIsJson = !this.editIsJson;
    },
    // 返回编辑器时
    backEdit() {
      this.$confirm('将数据更新至文本内容?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.editorSuccess = !this.editorSuccess
        const { doc, methodName} = saveDoc(this.lastObject);
        this.docFileName = methodName;
        this.apiDocStr = doc;
        this.$message({
          type: 'info',
          message: '已更新内容'
        });
      }).catch(() => {
        this.editorSuccess = !this.editorSuccess
      });
    },
    // 获取动态实体
    getDynamicEntity(data) {
      const _dynamicEntity = [];
      data.forEach(item => {
        item.fieldList.forEach(field => {
          if(field.name === 'isDynamicEntity') {
            _dynamicEntity.push(item)
          }
        })
      })
      // console.log(_dynamicEntity)
      // // format动态组件结构
      const dynamicEntityList = [];
      if(_dynamicEntity.length) {
        for (let i = 0; i < _dynamicEntity.length; i++) {
          const node = _dynamicEntity[i];
          dynamicEntityList[i] = ({
            isDynamic: true,
            nanoid: nanoid(),
            showChild: false,
            isList: false,
            type: 'Api_DynamicEntity',
            entity: node.name,
            nodes: this.getJsonTree(data, node.name),
          });
        }
      }
      // console.log(dynamicEntityList)
      return dynamicEntityList;
    },
    // 将平铺数据转换成树状结构
    getJsonTree(data, type) {
      const itemArr = [];
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (node.name == type) {
          for (let j = 0; j < node.fieldList.length; j++) {
            const _nodeType = node.fieldList[j].type;
            // 如果实体内字段调用实体本身时 _nodeType === node.name
            const newNode = {
              ...node.fieldList[j],
              nanoid: nanoid(),
              showChild: false,
              entity: type,
              type: node.fieldList[j].isList
                ? `List[${node.fieldList[j].type}]`
                : node.fieldList[j].type,
              nodes: _nodeType !== node.name
                ? this.getJsonTree(data, _nodeType)
                : [],
              isSelfEntity: _nodeType === node.name
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
    // 添加动态实体
    addDynamicEntity() {
      const _item = {
        entity: `Api_${nanoid()}`,
        isDynamic: true,
        nanoid: nanoid(),
        nodes: [{
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
        }],
        showChild: false
      };
      this.lastObject.dynamicEntity.push(_item)
    }
  }
};
</script>

<style lang="scss">
.home-container {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  .code-edit {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: #eee;
    box-sizing: border-box;
  }
  .btns-group {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 11;
    .transform-doc, .json-doc, .generate-doc {
      width: 110px;
      border-radius: 0;
      margin-left: 0;
    }
  }
  .json-tree-content {
    width: 100%;
    padding: 15px;
    position: relative;
    box-sizing: border-box;
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

  .ace_scrollbar-v::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .ace_scrollbar-v::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #f0f0f0;
  }

  .ace_scrollbar-v::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 10px;
    background: none;
  }

  .prompt {
    display: flex;
    justify-items: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: rgba(64, 160, 255, 0.8);
    font-size: 12px;
    color: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    & > p {
      display: flex;
      align-items: center;
      padding-right: 100px;
      & > i {
        padding-right: 10px;
        font-size: 12px;
      }
      .el-icon-question {
        font-size: 14px;
      }
    }
  }

  .editor-search {
    position: fixed;
    top: 50px;
    right: 10px;
    width: 300px;
    z-index: 10;
    .el-input__icon {
      height: 100%;
      width: 30px;
      padding-left: 5px;
      border-left: 1px solid #eee;
      color: #409eff;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>


