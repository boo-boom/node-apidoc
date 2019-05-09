/**
 * @block [node_aestheticslab.batchGetStoreListByIds]
 * @api {post} node_aestheticslab.batchGetStoreListByIds batchGetStoreListByIds
 * @apiDescription
 * "title":"美学实验室获取线下门店信息",
 * 
 * "groupOwner":"王柯迪",
 * 
 * "methodOwner":"陈志祥",
 * 
 * "securityLevel":"Anonym",
 * 
 * "returnType":"Api_AESTHTICSLAB_StoreImage_Resp_Node",
 * 
 * "state":"OPEN",
 * 
 * "detail":null,
 * 
 * "encryptionOnly":false,
 * 
 * "needVerify":false
 * 
 * @apiGroup node_aestheticslab
 * 
 * @apiParam {List[int]} storeIds 门店ID
 * 
 * @block [Api_AESTHTICSLAB_StoreImage_Resp_Node] 返回主体
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {int} id 门店ID
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} name 门店名称
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} nameAbbreviation 门店简称
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} thumbImgUrl 门店图片
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} address 门店地址
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} province 省
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} city 市
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} region 区
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} location 地理位置坐标
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} trafficDirections 交通指导
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {date} startBusinessTime 开业时间
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} openingTime 营业开始时间
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} closingTime 打烊时间
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {boolean} showInAestheticLaboratory 是否在美学实验室展示
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} storeMapUrl 门店地图URL
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {string} surfacePlotUrl 门店封面图
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {int} storeEnvPictureTotal 门店图片总数（讲座现场+门店环境图片数总和）
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {int} lastPicType 最后一张图片来自：1:门店环境图，0:讲座现场图，-1:图片总数不够
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {List[Api_STORE_StoreServeItem_Node]} storeServeItems 设施服务
 * @apiSuccess (Api_AESTHTICSLAB_StoreImage_Resp_Node) {list[Api_AESTHTICSLAB_StoreEnvPicture_Node]} storeEnvPictures 门店环境图(最多返回4张)
 * 
 * @block [Api_STORE_StoreServeItem_Node]
 * @apiSuccess (Api_STORE_StoreServeItem_Node) {int} id 服务项ID
 * @apiSuccess (Api_STORE_StoreServeItem_Node) {string} description 描述
 * @apiSuccess (Api_STORE_StoreServeItem_Node) {string} imageUrl 图片url
 * @apiSuccess (Api_STORE_StoreServeItem_Node) {int} picType 图片的取自于：1:门店环境图，0:讲座现场图
 * 
 * @block [Api_AESTHTICSLAB_StoreEnvPicture_Node]
 * @apiSuccess (Api_AESTHTICSLAB_StoreEnvPicture_Node) {string} picUrl 图片URL
 * @apiSuccess (Api_AESTHTICSLAB_StoreEnvPicture_Node) {boolean} isSurfacePlot 是否是封面图
 * @apiSuccess (Api_AESTHTICSLAB_StoreEnvPicture_Node) {int} height 高
 * @apiSuccess (Api_AESTHTICSLAB_StoreEnvPicture_Node) {int} width 宽
 */