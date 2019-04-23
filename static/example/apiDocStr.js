/**
 * @block [node_aestheticslab.searchLectureList]
 * @api {post} aestheticslab.searchLectureList,node_aestheticslab.searchLectureList searchLectureList
 * @apiDescription
 * "title":"搜索门店活动列表",
 *
 * "detail":null,
 *
 * "encryptionOnly":false,
 *
 * "groupOwner":"熊志强",
 *
 * "methodOwner":"熊志强",
 *
 * "needVerify":false,
 *
 * "returnType":"Api_AESTHETICSLAB_searchLectureList_NodeResp",
 *
 * "securityLevel":"Anonym",
 *
 * "state":"OPEN"
 *
 * @apiGroup node_aestheticslab
 *
 * @block [参数列表]
 * @apiParam {string} aaaaa test11111123123213
 * @apiParam {Api_AESTHETICSLAB_LectureListSearchParam} lectureListSearchParam 活动列表搜索参数
 * @apiParam {Api_AESTHETICSLAB_PageParameter} pageParameter 分页参数
 *
 * @block [Api_AESTHETICSLAB_LectureListSearchParam]
 * @apiParam (Api_AESTHETICSLAB_LectureListSearchParam) {int} storeId 门店ID
 * @apiParam (Api_AESTHETICSLAB_LectureListSearchParam) {string} lectureType 活动类型 END 往期讲座, NEAR_FUTURE 近期讲座, UNDERWAY 进行中讲座
 *
 * @block [Api_AESTHETICSLAB_PageParameter]
 * @apiParam (Api_AESTHETICSLAB_PageParameter) {int} offset 记录偏移量
 * @apiParam (Api_AESTHETICSLAB_PageParameter) {int} limit 返回记录最大数量
 *
 * @apiParamExample
 * [返回值]
 * @block [Api_AESTHETICSLAB_searchLectureList_NodeResp] 返回主体
 * @apiSuccess (Api_AESTHETICSLAB_searchLectureList_NodeResp) {list[Api_AESTHETICSLAB_NodeLectureListItem]} lectureListItemList 活动列表数据
 * @apiSuccess (Api_AESTHETICSLAB_searchLectureList_NodeResp) {int} total 活动总数
 * @apiSuccess (Api_AESTHETICSLAB_searchLectureList_NodeResp) {int} sigUping 报名中的活动数量
 * @apiSuccess (Api_AESTHETICSLAB_searchLectureList_NodeResp) {int} lectureUnder 进行中的场次数量
 * @apiSuccess (Api_AESTHETICSLAB_searchLectureList_NodeResp) {List[Api_AESTHETICSLAB_NodeLectureStoreInfo]} store 活动门店列表
 *
 * @block [Api_AESTHETICSLAB_NodeLectureStoreInfo] 活动门店列表实体
 * @apiSuccess (Api_AESTHETICSLAB_NodeLectureStoreInfo) {int} id 门店ID
 * @apiSuccess (Api_AESTHETICSLAB_NodeLectureStoreInfo) {string} name 门店名称
 * @apiSuccess (Api_AESTHETICSLAB_NodeLectureStoreInfo) {string} nameAbbreviation 门店简称
 * @apiSuccess (Api_AESTHETICSLAB_NodeLectureStoreInfo) {boolean} isOpenedRecently 是否是新开店（一个月内开的店)
 * 
 * @block [Api_AESTHETICSLAB_NodeMaterialImageInfo] 缩略图实体
 * @apiSuccess (Api_AESTHETICSLAB_NodeMaterialImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_AESTHETICSLAB_NodeMaterialImageInfo) {string} url 	图片地址
 * @apiSuccess (Api_AESTHETICSLAB_NodeMaterialImageInfo) {short} height 图片高度
 * @apiSuccess (Api_AESTHETICSLAB_NodeMaterialImageInfo) {short} lectureId 图片宽度
 *
 * @block [Api_AESTHETICSLAB_NodeRoundSimpleInfo] 场次信息实体
 * 
 * 
 *
 */
