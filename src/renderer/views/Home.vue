<template>
  <div class="home-container">
    <div class="left">
      <el-input type="textarea" resize="none" :rows="2" placeholder="请将apiDoc粘贴至此" v-model="apiDocStr"></el-input>
      <el-button class="transform-doc" size="small" type="primary" :icon="showTfLoading?'el-icon-loading':'el-icon-sort'" @click="docToJson"> 文档转换</el-button>
      <el-button class="generate-doc" size="small" type="danger" :icon="showGeLoading?'el-icon-loading':'el-icon-download'" :disabled="!docLoadDone" @click="jsonToDoc"> 文档生成</el-button>
    </div>
    <div class="right">
      <div v-if="docLoadDone">
        <!-- 基础信息 -->
        <el-form :model="lastObject" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <BaseInfo v-if="JSON.stringify(lastObject.baseInfo)!='{}'" :info="lastObject.baseInfo"/>
        </el-form>
        <!-- 请求参数 -->
        <div class="title" v-if="lastObject.params.parameter.length">
          <span>请求参数</span>
        </div>
        <ParamsInfo v-if="lastObject.params.parameter.length" :content="lastObject.params.parameter"/>
        <!-- 返回数据 -->
        <div class="title" style="paddingTop:20px;" v-if="lastObject.respStructList.length">
          <span>返回数据</span>
        </div>
        <div class="json-view" v-if="lastObject.respStructList.length">
          <tree-field :content="lastObject.respStructList" />
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
import { createDoc } from "@/assets/utils/parser.js";
import { nodeType, methodName } from "@/assets/utils/nodes.js";
import BaseInfo from '@/components/BaseInfo';
import ParamsInfo from '@/components/ParamsInfo';
import TreeField from "@/components/TreeField";

export default {
  name: "home-container",
  components: { BaseInfo, ParamsInfo, TreeField },
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
      docFileName: '',      // 保存文档时的文件名
      dialogFormVisible: false, // 保存文档时输入文件名的dialog
      lastObject: {         // 最后完成的数据
        baseInfo: {},
        params: {
          parameter: [],
          reqStruct: []
        },
        respStructList: [],
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
    this.docToJson()
  },
  computed: {
    // 文档转化结束
    docLoadDone() {
      if(!this.lastObject.respStructList.length) {
        return false
      }
      return true
    }
  },
  methods: {
    // 转换文档
    docToJson() {
      this.showTfLoading = true;
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
              fomartJson(api_data, infoJson => {
                const curApi = infoJson.apiList[0];
                // 获取初始化数据
                this.lastObject.baseInfo = {
                  methodName: `${methodName(curApi.methodName, true)}`,
                  description: curApi.description,
                  groupOwner: curApi.groupOwner,
                  methodOwner: curApi.methodOwner,
                  state: curApi.state,
                  securityLevel: curApi.securityLevel,
                  detail: curApi.detail,
                  encryptionOnly: curApi.encryptionOnly,
                  needVerify: curApi.needVerify,
                  returnType: nodeType(curApi.returnType),
                }
                // 获取参数
                this.lastObject.params = {
                  parameter: this.addNanoId(curApi.parameterInfoList),
                  reqStruct: this.addNanoId(curApi.reqStructList)
                }

                console.log(curApi)
                // 获取返回数据
                this.lastObject.respStructList = this.addNanoId(curApi.respStructList);
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
    },
    addNanoId(data) {
      console.log(data)
      data.forEach(item => {
        item.nanoid = nanoid();
        if(item.fieldList && item.fieldList.length) {
          item.fieldList.forEach(field => {
            field.nanoid = nanoid();
          })
        }
      });
      return data;
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
            const { doc, methodName} = saveDoc(this.lastObject);
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
      // fs.writeFileSync(this.docPath, doc);
      console.log(this.docPath, this.docFileName, this.docToFile)
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


