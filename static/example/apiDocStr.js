
/**
 * @api {post} node_aestheticslab.getLectureAllInfo getLectureAllInfo
 *
 *
 * @apiDescription
 * "title":"获取活动详情",
 * "groupOwner":"王柯迪",
 * "methodOwner":"千云锋",
 * "securityLevel":"Anonym",
 * "returnType":"Api_AESTHETICSLAB_LectureAllInfo_NodeResp",
 * "state":"OPEN",
 * "detail": null,
 * "encryptionOnly":false,
 * "needVerify":false
 *
 *
 * @apiGroup node_aestheticslab
 *
 *
 * @apiParam {long} lectureId 活动ID
 *
 * @block [Api_AESTHETICSLAB_LectureAllInfo_NodeResp]
 * @apiSuccess (Api_AESTHETICSLAB_LectureAllInfo_NodeResp) {Api_COMMUNITYPOST_NodePostInfo} postContent 活动内容主体
 * @apiSuccess (Api_AESTHETICSLAB_LectureAllInfo_NodeResp) {Api_Aaa_Bbb} postContentqq111 活动内容主体111
 *
 *
 * @block [Api_COMMUNITYPOST_NodePostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_NodePostInfo) {list[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo,
 *
 *
 * @block [Api_DynamicEntity]
 * @apiSuccess (Api_DynamicEntity) {[T]} entity 动态实体11111
 * @apiSuccess (Api_DynamicEntity) {string} typeName 实体名123123
 *
 *
 * @block [Api_COMMUNITYPOST_ImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {list[Api_COMMUNITYPOST_NodeTagInfo]} tagInfoList 标签信息
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
 *
 *
 * @block [Api_COMMUNITYPOST_SegmentInfo]
 * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {Api_Aaa_Bbb} aaa bbb链接
 *
 *
 * @block [Api_Aaa_Bbb]
 * @apiSuccess (Api_Aaa_Bbb) {Api_Ccc_Ddd} url222 seg2222
 *
 *
 * @block [Api_Ccc_Ddd]
 * @apiSuccess (Api_Ccc_Ddd) {string} url111 segment链接111
 *
 *
 * @block [Api_COMMUNITYPOST_TextInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字
 *
 *
 * @apiError (Error_msg) {PARAM_ERROR_NUMBER_4000003} 4000003 参数错误
 */