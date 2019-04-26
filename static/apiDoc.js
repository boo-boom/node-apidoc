export default `
/**
 * @api {post} aestheticslab.getLectureAllInfo getLectureAllInfo
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
 * @apiGroup aestheticslab
 *
 *
 * @apiParam {Api_SEARCH_SearchFCategoryRequestParam_Node} searchFCategoryRequestParam 请求参数
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} searchId 搜索条件id，也即二级前端类目的id, <=0:本参数无效
 *
 * @apiParam {Api_SEARCH_SearchFCategoryRequestParam123_Node} searchFCategoryRequestParam123 请求参数123
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam123_Node) {int} searchId 搜索条件id，也即二级前端类目的id, <=0:本参数无效
 *
 * @apiParam {int} hasActivity 活动过滤，0:本参数无效，1:无活动，2:有活动
 *
 * @block [Api_AESTHETICSLAB_LectureAllInfo_NodeResp]
 * @apiSuccess (Api_AESTHETICSLAB_LectureAllInfo_NodeResp) {Api_COMMUNITYPOST_NodePostInfo} postContent 活动内容主体
 * @apiSuccess (Api_AESTHETICSLAB_LectureAllInfo_NodeResp) {Api_Aaa_Bbb} postContentqq111 活动内容主体111
 *
 *
 * @block [Api_COMMUNITYPOST_NodePostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_NodePostInfo) {list[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo,
 * @apiSuccess (Api_COMMUNITYPOST_NodePostInfo) {long} long1 测试1
 * @apiSuccess (Api_COMMUNITYPOST_NodePostInfo) {long} long2 测试2
 *
 *
 * @block [Api_DynamicEntity]
 * @apiSuccess (Api_DynamicEntity) {[T]} entity 动态实体
 * @apiSuccess (Api_DynamicEntity) {string} typeName 实体名
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
 * @apiSuccess (Api_Aaa_Bbb) {Api_Ccc_Ddd} url333 seg333
 * @apiSuccess (Api_Aaa_Bbb) {Api_Ccc_Ddd} url444 seg4444
 *
 *
 * @block [Api_Ccc_Ddd]
 * @apiSuccess (Api_Ccc_Ddd) {string} url111 segment链接111
 * @apiSuccess (Api_Ccc_Ddd) {string} url222 segment链接222
 *
 *
 * @block [Api_COMMUNITYPOST_TextInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字1
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字2
 *
 *
 * @apiError (Error_msg) {PARAM_ERROR_NUMBER_4000003} 4000003 参数错误
 */
`;
