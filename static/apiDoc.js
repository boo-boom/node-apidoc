export default `
/**
 * @block [node_search.searchFCategoryWithFacet]
 *
 * @api {post} node_search.searchFCategoryWithFacet searchFCategoryWithFacet
 *
 * @apiDescription
 * "title":"前端类目搜索，支持切面",
 *
 * "groupOwner":"王柯迪",
 *
 * "methodOwner":"张恒",
 *
 * "securityLevel":"Anonym",
 *
 * "returnType":"Api_SEARCH_SearchProductResult_Node",
 *
 * "state":"OPEN",
 *
 * "detail":null,
 *
 * "encryptionOnly":false,
 *
 * "needVerify":false
 *
 * @apiGroup node_search
 *
 * @apiParam {Api_SEARCH_SearchFCategoryRequestParam_Node} searchFCategoryRequestParam 请求参数
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} searchId 搜索条件id，也即二级前端类目的id, <=0:本参数无效
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {string} searchName 搜索条件name，也即二级前端类目name
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} l1FCategoryId 一级前端类目id
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {string} l1FCategoryName 一级前端类目name
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {List[Api_SEARCH_GeneralTagFilter_Node]} generalTagFilters 通用标签过滤
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} hasActivity 活动过滤，0:本参数无效，1:无活动，2:有活动
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} minPrice 最小价格（单位为分）, <=0:本参数无效
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {int} maxPrice 最大价格（单位为分）, <=0:本参数无效
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {List[int]} l3CategoryIds 后端三级类目id过滤
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {List[Api_SEARCH_TextAttributeFilter_Node]} textAttributeFilters 文本属性过滤
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {string} sortType 排序类型 DEFAULT 默认综合, FIRST_ON_SALE 商品首次上架时间, MIN_SKU_PRICE 在售sku最低价格, SPU_SALE_COUNT spu销量, WEIGHT 商品权重
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {boolean} sortAsc 排序顺序是否为升序
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {string} provinceId 省id，用于配送范围过滤
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {string} cityId 市id，用于配送范围过滤
 * @apiParam (Api_SEARCH_SearchFCategoryRequestParam_Node) {Api_SEARCH_PageParameter_Node} page 分页选项
 *
 * @apiParam (Api_SEARCH_GeneralTagFilter_Node) {string} tagType 通用tag类型 BRAND 品牌, CATEGORY 后端类目, TEXT 商品文本标签
 * @apiParam (Api_SEARCH_GeneralTagFilter_Node) {int} tagId tag id，文本标签没有tag id，<=0: 本参数无效
 * @apiParam (Api_SEARCH_GeneralTagFilter_Node) {string} tagText tag文本
 *
 * @apiParam (Api_SEARCH_TextAttributeFilter_Node) {string}	name 属性名
 * @apiParam (Api_SEARCH_TextAttributeFilter_Node) {string} value 属性值
 *
 * @apiParam (Api_SEARCH_PageParameter_Node) {int}	offset	记录偏移量
 * @apiParam (Api_SEARCH_PageParameter_Node) {int}	limit	返回记录最大数量
 *
 * @block [Api_SEARCH_SearchProductResult_Node]
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {int} totalCount 总量
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {List[string]} aggregateTags 搜索聚合关键词
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {string} source 结果来源
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {string} searchUid uniqueId
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {string} version searchResult版本，当字段发生变化时更新
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {boolean} useExtend 是否使用查询扩展
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {List[Api_SEARCH_ItemAggregation_Node]} aggregations 产品聚合信息
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {List[Api_SEARCH_SearchProduct_Node]} result 产品搜索结果
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {List[Api_SEARCH_SearchProduct_Node]} extendResult 产品搜索扩展结果
 * @apiSuccess (Api_SEARCH_SearchProductResult_Node) {Api_SEARCH_FacetItems_Node} facet 切面筛选条件
 *
 * @block [Api_SEARCH_SearchProduct_Node]
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} productId 产品id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} spuCode 产品spu code
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} productName 产品名称
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} productName2 产品名称2
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} originalName 原产品名
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} title 产品title
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} secondTitle 副标题
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} brandId 品牌id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} brandName 品牌名称
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} brandImageUrl 品牌图片
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} channelId 渠道商id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} channelName 渠道商名称
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} supplierId 供应商id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} supplierName 供应商名称
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {boolean} isCrowdfunding 是否为众筹
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} mainImageUrl 题图url
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} thumbnailUrl 缩略图url
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {List[string]} slideImages 轮播图url
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} linkUrl 商品跳转链接
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} relativeLinkUrl 商品跳转相对链接
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {Api_PRODUCT_StockPrice3_Node} saleInfo 价格、库存等销售信息
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} categoryLevel1Id 一级后台分类id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} categoryLevel1Name 一级后台分类name
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} categoryLevel2Id 二级后台分类id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} categoryLevel2Name 二级后台分类name
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} categoryLevel3Id 三级后台分类id
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} categoryLevel3Name 三级后台分类name
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {boolean} onSale spu是否上架
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {int} spuStockCount spu库存数量, 用于判断是否商品有无库存
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {List[string]} tagList 标签描述
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {List[Api_SEARCH_ProductIndicator_Node]} indicatorList 商品标识列表
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {string} spm 列表埋码后三位
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {boolean} canAddCart 是否能加入购物车
 * @apiSuccess (Api_SEARCH_SearchProduct_Node) {boolean} isShowSimilar 是否展示看相似
 *
 * @block [Api_PRODUCT_StockPrice3_Node]
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {int}	id 产品ID
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {int} stock 库存数量
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {Api_PRODUCT_SPUPriceInfo_Node} priceInfo SPU价格字段
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {boolean} onSale 是否上架
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {List[Api_PRODUCT_Indicator_Node]} indicatorList 当前生效商品标识符
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {List[string]} tagList 标签描述
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {List[Api_PRODUCT_BriefTag_Node]} tagList2 用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} productName 名称
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} originalName 原始商品名
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} secondTitle 摘要 (原 副标题)
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} linkUrl 商品跳转链接
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} relativeLinkUrl 相对链接
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} mainImageUrl 题图
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {string} thumbnailUrl 缩略图
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {List[string]} skuThumbnailList 规格图
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {int} groupCount 拼团人数
 * @apiSuccess (Api_PRODUCT_StockPrice3_Node) {int} crowdFundingCount 众筹数量
 *
 * @block [Api_PRODUCT_SPUPriceInfo_Node]
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo_Node) {Api_PRODUCT_SKUPriceInfo_Node} minPriceInfo 最小SKU价格信息
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo_Node) {Api_PRODUCT_SKUPriceInfo_Node} maxPriceInfo 最大SKU价格信息
 *
 * @block [Api_PRODUCT_SKUPriceInfo_Node]
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} dailyPrice 日销价格
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} directPrice 直购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} price 实际售价（拼团活动中取拼团价）
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} tagPrice 厂商指导价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} vipPrice 会员价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} groupBuyPrice 团购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo_Node) {int} groupBuyVipPrice 团购会员价
 *
 * @block [Api_PRODUCT_Indicator_Node]
 * @apiSuccess (Api_PRODUCT_Indicator_Node) {string} type 类型 AUCTION 拍卖品, CANT_COUPON 不能使用优惠券, CANT_USE_USER_POINT 不能使用积分, CAN_NOT_PUSH_DELIVER 不可催发货, COLOR_500 500色铅笔, COMPANY_PURCHASE 企业购, CROWDFUNDING 众筹, DEPOSIT 保证金, DISTRIBUTABLE 分销, GIFT 赠品, GROUPBUY 拼团, HOT 爆款商品, MYRIAD_GROUPBUY 万人团, NEW 新品, NOT_GRANT_USER_POINT 不赠送积分, NOT_MANAGE_STOCK 不需要管理库存, NO_VIP 不享受VIP折扣, ON_LINE 线上销售, OVERSEAS 海淘, PACKING_SERVICE 包装服务, PRESELL 预售, PROCESSED_FOOD 加工食品, RETAIL_STORE 线下销售, SN 需要S/N码, TEST 测试商品, TRIAL 试用装商品, VIDEO 视频, VIP_TRIAL VIP试用, VIRTUAL 虚拟商品, YOOX YOOX商品
 * @apiSuccess (Api_PRODUCT_Indicator_Node) {string} label 名称
 * @apiSuccess (Api_PRODUCT_Indicator_Node) {date} startTime 开始时间
 * @apiSuccess (Api_PRODUCT_Indicator_Node) {date} endTime 结束时间
 *
 * @block [Api_PRODUCT_BriefTag_Node]
 * @apiSuccess (Api_PRODUCT_BriefTag_Node) {string}	label 标签描述
 * @apiSuccess (Api_PRODUCT_BriefTag_Node) {string} color 标签颜色（十六进制带#）
 *
 * @block [Api_SEARCH_ProductIndicator_Node]
 * @apiSuccess (Api_SEARCH_ProductIndicator_Node) {string} type 类型
 * @apiSuccess (Api_SEARCH_ProductIndicator_Node) {string} label 名称
 * @apiSuccess (Api_SEARCH_ProductIndicator_Node) {date} startTime 开始时间
 * @apiSuccess (Api_SEARCH_ProductIndicator_Node) {date} endTime 结束时间
 *
 * @block [Api_SEARCH_ItemAggregation_Node]
 * @apiSuccess (Api_SEARCH_ItemAggregation_Node) {List[Api_SEARCH_ItemBucket_Node]} buckets 聚合结果列表
 * @apiSuccess (Api_SEARCH_ItemAggregation_Node) {string} name 聚合名称
 *
 * @block [Api_SEARCH_ItemBucket_Node]
 * @apiSuccess (Api_SEARCH_ItemBucket_Node) {int} id 聚合桶id
 * @apiSuccess (Api_SEARCH_ItemBucket_Node) {string} displayName 聚合桶显示名称
 * @apiSuccess (Api_SEARCH_ItemBucket_Node) {string} imageUrl 聚合桶显示图片
 * @apiSuccess (Api_SEARCH_ItemBucket_Node) {int} count 聚合的数量
 *
 * @block [Api_SEARCH_FacetItems_Node]
 * @apiSuccess (Api_SEARCH_FacetItems_Node) {List[Api_SEARCH_FacetItem_Node]} facetItems 属性列表，包括类目、普通文本属性、（品牌）等
 * @apiSuccess (Api_SEARCH_FacetItems_Node) {List[Api_SEARCH_RecAddressInfo_Node]} userRecAddresses 用户收货地址
 *
 * @block [Api_SEARCH_FacetItem_Node]
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {string} type 属性类别 BRAND 品牌, 保留字段, L3_CATEGORY 3级类目, TEXT_ATTRIBUTE 商品文本属性
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {int} attributeId 属性id，保留字段
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {string} attributeName 属性name
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {List[Api_SEARCH_FacetItemValue_Node]} attributeValues 属性值列表
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {boolean} isShowOut 是否在外部展示
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {string} outSpm 外部时的spm
 * @apiSuccess (Api_SEARCH_FacetItem_Node) {string} sideSpm 侧边时的spm，保留字段
 *
 * @block [Api_SEARCH_FacetItemValue_Node]
 * @apiSuccess (Api_SEARCH_FacetItemValue_Node) {int} valueId 属性值id
 * @apiSuccess (Api_SEARCH_FacetItemValue_Node) {string} valueText 属性值文本
 * @apiSuccess (Api_SEARCH_FacetItemValue_Node) {int} productCount 商品数量，保留字段
 * @apiSuccess (Api_SEARCH_FacetItemValue_Node) {string} outSpm 在外部时的spm
 * @apiSuccess (Api_SEARCH_FacetItemValue_Node) {string} sideSpm 在侧边时的spm
 *
 * @block [Api_SEARCH_RecAddressInfo_Node]
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {long} id id
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} nationName 国家
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} provinceName 省份
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} provinceCode 省份编码
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} cityName 城市
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} cityCode 城市编码
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} regionName 区
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} regionCode 区编码
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} detail 详细地址
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {short} isDefault 默认地址标示，1 默认地址，0 非默认
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} cellphone 收货人手机号
 * @apiSuccess (Api_SEARCH_RecAddressInfo_Node) {string} name 收货人姓名
 *
 * @apiError (Error_msg) {PARAM_ERROR_NUMBER_4000003} 4000003 参数错误
 */
`;
