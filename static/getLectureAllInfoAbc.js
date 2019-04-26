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
  * @apiParam {long} lectureId1 活动ID111
  * @apiParam {long} lectureId2 活动ID222
  *
  * @block [Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp]
  * @apiSuccess (Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp) {Api_NodeCOMMUNITYPOST_NodePostInfo} postContent1231231231231123 活动内容主体
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
  *
  * @block [Api_NodeAaa_Bbb]
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url222 seg2222
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url333 seg333
  * @apiSuccess (Api_NodeAaa_Bbb) {Api_NodeCcc_Ddd} url444 seg4444
  *
  * @block [Api_NodeCcc_Ddd]
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url111 segment链接111
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url222 segment链接222
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url111 segment链接111
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url222 segment链接222
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url111 segment链接111
  * @apiSuccess (Api_NodeCcc_Ddd) {string} url222 segment链接222
  
  */