/**
 * @api {post} node_aestheticslab.getLectureAllInfo getLectureAllInfo
 *
 * @apiDescription
 * "title":"获取活动详情",
 * "groupOwner":"王柯迪",
 * "methodOwner":"千云锋",
 * "securityLevel":"Anonym",
 * "returnType":"Api_NodeAESTHETICSLAB_LectureAllInfo_NodeResp",
 * "state":"OPEN",
 * "detail":null,
 * "encryptionOnly":false,
 * "needVerify":false
 *
 * @apiGroup node_aestheticslab
 * 
 *
 * @block [Api_NodeAESTHETICSLAB_LectureListSearchParam]
 * @apiParam {Api_NodeAESTHETICSLAB_LectureListSearchParam} lectureListSearchParam 活动列表搜索参数
 * @apiParam (Api_NodeAESTHETICSLAB_LectureListSearchParam) {int} storeId 门店ID
 * @apiParam (Api_NodeAESTHETICSLAB_LectureListSearchParam) {string} lectureType 活动类型 END 往期讲座, NEAR_FUTURE 近期讲座, UNDERWAY 进行中讲座
 *
 * @block [Api_NodeAESTHETICSLAB_PageParameter]
 * @apiParam {Api_NodeAESTHETICSLAB_PageParameter} pageParameter 分页参数
 * @apiParam (Api_NodeAESTHETICSLAB_PageParameter) {int} offset 记录偏移量
 * @apiParam (Api_NodeAESTHETICSLAB_PageParameter) {int} limit 返回记录最大数量
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
 * @apiSuccess (Api_NodeCOMMUNITYPOST_NodePostInfo) {Api_NodeAaa_Bbb} long3 测试3
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
 *
 * @block [Api_COMMUNITYPOST_ImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {List[Api_NodeCOMMUNITYPOST_NodeTagInfo]} tagInfoList 标签信息
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
 *
 * @block [Api_NodeCOMMUNITYPOST_NodeTagInfo]
 * @apiSuccess (Api_NodeCOMMUNITYPOST_NodeTagInfo) {string} linkUrl123 跳转链接123
 * @apiSuccess (Api_NodeCOMMUNITYPOST_NodeTagInfo) {string} 123 123跳转链接123
 *
 * @block [Api_COMMUNITYPOST_SegmentInfo]
 * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {Api_NodeAaa_Bbb} aaa bbb链接
 * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {Api_NodeAaa_Bbb} aaa123 bbb123链接
 *
 * @block [Api_COMMUNITYPOST_TextInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text1 文字1
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text2 文字2
 *
 *
 * @apiError (Error_msg) {PARAM_ERROR_NUMBER_4000003} 4000003 参数错误
 * @apiError (Error) {PARAM_ERROR_NUMBER_4000001} 4000001 参数错误1
 */