/** *  
  * @api {post} node_aestheticslab.getLectureAllInfo getLectureAllInfo
  *
  * @apiDescription
  * "title":"获取活动详情",
  * "groupOwner":"王柯迪",
  * "methodOwner":"千云锋",
  * "securityLevel":"Anonym",
  * "returnType":"Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp",
  * "state":"OPEN",
  * "detail":"",
  * "encryptionOnly":false,
  * "needVerify":false
  *
  * @apiGroup node_aestheticslab
  * 
  *
  * @apiParam {long} lectureId1 活动ID111
  * @apiParam {long} lectureId2 活动ID222
  *
  *
  * @block [Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp]
  * @apiSuccess (Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp) {Api_NodeCOMMUNITYPOST_NodePostInfo} postContent 活动内容主体
  * @apiSuccess (Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp) {Api_NodeAaa_Bbb} postContentqq111 活动内容主体111
  *
  * @block [Api_NodeCOMMUNITYPOST_NodePostInfo]
  * @apiSuccess (Api_NodeCOMMUNITYPOST_NodePostInfo) {List[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo,
  * @apiSuccess (Api_NodeCOMMUNITYPOST_NodePostInfo) {long} long1 测试1
  * @apiSuccess (Api_NodeCOMMUNITYPOST_NodePostInfo) {long} long2 测试2
  *
  * @block [Api_DynamicEntity]
  * @apiSuccess (Api_DynamicEntity) {[T]} entity 动态实体
  * @apiSuccess (Api_DynamicEntity) {string} typeName 实体名
  * @apiSuccess (Api_DynamicEntity) {string} Field_-VDfw 
  * @apiSuccess (Api_DynamicEntity) {string} Field_isDR_ 
  *
  * @block [Api_NodeAaa_Bbb]
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url222 seg2222
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url333 seg333
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url444 seg4444
  *
  * @block [Api_NodeCcc_Ddd]
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url111 segment链接111
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url222 segment链接222
  *
  * @block [Api_COMMUNITYPOST_ImageInfo]
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {List[Api_COMMUNITYPOST_NodeTagInfo]} tagInfoList 标签信息
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
  * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
  *
  * @block [Api_COMMUNITYPOST_NodeTagInfo]
  * @apiSuccess (Api_COMMUNITYPOST_NodeTagInfo) {string} Field_MfFay 
  * @apiSuccess (Api_COMMUNITYPOST_NodeTagInfo) {string} linkUrl123 跳转链接123
  * @apiSuccess (Api_COMMUNITYPOST_NodeTagInfo) {string} 123 123跳转链接123
  *
  * @block [Api_COMMUNITYPOST_SegmentInfo]
  * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {Api_NodeAaa_Bbb} aaa bbb链接
  * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {Api_NodeAaa_Bbb} aaa123 bbb123链接
  *
  * @block [Api_COMMUNITYPOST_TextInfo]
  * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字
  * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text1 文字1
  * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text2 文字2
  */