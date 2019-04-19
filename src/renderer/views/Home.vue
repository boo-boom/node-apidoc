<template>
  <div class="home-container">
    <div class="left">
      <el-input
        type="textarea"
        resize="none"
        :rows="2"
        placeholder="请将apiDoc粘贴至此"
        v-model="apiDocStr">
      </el-input>
      <el-button class="btn" size="mini" type="primary" :icon="showBtnLoading?'el-icon-loading':''" @click="docToJson">文档转换</el-button>
    </div>
    <div class="right">
      <el-form v-if="docPath" :model="lastObject" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <BaseInfo v-if="JSON.stringify(lastObject.baseInfo)!='{}'" :info="lastObject.baseInfo"/>
        <ParamsInfo v-if="lastObject.params.length" :info="lastObject.params"/>
      </el-form>
    </div>
  </div>
</template>

<script>
import apiDocStr from './../../../static/apiDoc.js';
const path = require('path');
const fs = require('fs');
const { fomartJson } = require('@/assets/utils/docJsonFormat')
const filePath = path.resolve(__dirname, '../../../static/example/apiDocStr.js');
const infoJsonPath = path.resolve(__dirname, '../../../static/apiDoc/info.json');
import { remote } from "electron";
import { createDoc } from "@/assets/utils/parser.js";
import BaseInfo from '@/components/BaseInfo';
import ParamsInfo from '@/components/ParamsInfo';
export default {
  name: "home-container",
  components: { BaseInfo, ParamsInfo },
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
      apiDocStr: '',
      showBtnLoading: false,
      docPath: '',
      lastObject: {
        baseInfo: {
          methodName: "",
          description: "",
          groupOwner: "",
          methodOwner: "",
          state: "",
          securityLevel: ""
        },
        params: [{
          description: "id",
            injectOnly: false,
            isList: false,
            isRequired: true,
            isRsaEncrypt: false,
            name: "reviewId",
            sequence: "",
            type: "long",
        }]
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
    // this.apiDocStr = apiDocStr;
  },
  methods: {
    docToJson() {
      this.showBtnLoading = true;
      // 写入文件
      fs.writeFile(filePath, this.apiDocStr, (err) => {
        if(err) {
          console.log(err.message)
          return
        }
        this.showBtnLoading = false;
        createDoc({
          cb: (isError) => {
            if(!isError) {
              this.$message.error("文档格式出错");
            } else {
              remote.dialog.showOpenDialog(
                {
                  title: "选择当前文档所需存放的目录",
                  properties: ["openDirectory"],
                },
                filePaths => {
                  if (filePaths) {
                    // this.docPath = filePaths[0];
                    // fomartJson(infoJsonPath)
                  }
                }
              );
              this.$message({
                showClose: true,
                message: "创建转换成功",
                type: "success"
              });
            }
          }
        });
      })
    },
    getJsonTree(data, type) {
      const itemArr = [];
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (node.name === type) {
          for (let j = 0; j < node.fieldList.length; j++) {
            const nodeType = node.fieldList[j].type;
            const newNode = {
              ...node.fieldList[j],
              nanoid: nanoid(),
              type: node.fieldList[j].isList
                ? `List[${node.fieldList[j].type}]`
                : node.fieldList[j].type,
              nodes: this.getJsonTree(data, nodeType)
            };
            itemArr.push(newNode);
          }
        }
      }
      return itemArr;
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
    .btn {
      position: absolute;
      top: 0;
      right: 15px;
      border-radius: 0 0 5px 5px;
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
  }
}
</style>


