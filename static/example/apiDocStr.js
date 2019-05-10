/**
 * @api {post} aestheticslab.getLectureInfo getLectureInfo
 *
 * @apiDescription
 * "title":"获取活动详情",
 * "groupOwner":"曹炜炜",
 * "methodOwner":"曹炜炜",
 * "securityLevel":"Anonym",
 * "returnType":"Api_AESTHETICSLAB_LectureInfo",
 * "state":"OPEN",
 * "detail":"",
 * "encryptionOnly":true,
 * "needVerify":false
 *
 * @apiGroup node_aestheticslab
 *
 * @apiParam {long} lectureId 活动ID
 *
 * @block [Api_AESTHETICSLAB_LectureInfo]
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {long} lectureId 活动ID
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {int} lectureNumber 活动期数
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {Api_AESTHETICSLAB_MaterialImageInfo} thumbImageEntity 缩略图
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {Api_AESTHETICSLAB_MaterialImageInfo} coverImageEntity 封面图
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {Api_COMMUNITYPOST_PostInfo} earlyPostContent 活动前期内容
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {Api_COMMUNITYPOST_PostInfo} laterPostContent 活动后期内容
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {long} earlyPostId 活动前期内容ID
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {long} laterPostId 活动后期内容ID
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {long} postId 评论／分享时的传递的内容ID
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {List[Api_AESTHETICSLAB_Kol]} kolList 主持人/嘉宾
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {string} lectureState 活动状态 LECTURE_END 已结束, LECTURE_UNDER_WAY 进行中, SIGN_UP_END 报名截止, SIGN_UP_NOT_START 预告, SIGN_UP_UNDER_WAY 报名中, SIGN_UP_UPPER_LIMIT 额满
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {boolean} multiRound 是否有多场次
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {string} signUpRuleText 报名规则文案
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {string} signUpRule 报名规则 DEFAULT default, FILTER 筛选制, PRIORITY 优先制
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {string} description 活动描述
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {int} collectCount 收藏数
 * @apiSuccess (Api_AESTHETICSLAB_LectureInfo) {List[Api_AESTHETICSLAB_RoundInfo]} roundInfoList 场次信息
 *
 * @block [Api_AESTHETICSLAB_MaterialImageInfo]
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {string} url 图片地址
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {short} height 图片高度
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {short} width 图片宽度
 *
 * @block [Api_AESTHETICSLAB_MaterialImageInfo]
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {string} url 图片地址
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {short} height 图片高度
 * @apiSuccess (Api_AESTHETICSLAB_MaterialImageInfo) {short} width 图片宽度
 *
 * @block [Api_COMMUNITYPOST_PostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {int} postId 内容id
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} type 内容类型 ARTICLE 长图文, IMAGES 普通图文, VIDEO 小视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_COMMUNITYPOST_TagCommunityBrief]} tagCommunityBriefList 标签列表
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} title 标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} subTitle 副标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} summary 摘要
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_UserBrief} userBrief 发布用户
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} postTime 发布时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} updateTime 更新时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} thumb 封面图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} listThumb 列表图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_VideoInfo} headVideoInfo 头部视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo, SpuInfo, 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} system 来源 AT 美学实验室, ATV 美学实验室心得, CENTER 内容平台, FOOD_VIDEO 美食台, HOUSE 一条house, LIFE_POST 生活贴, SF 二楼, YITCOM 一条生活馆, YIT_KT 一条课堂
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} postStatus 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} shareCount 分享数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} commentCount 评论数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} likeCount 点赞数
 *
 * @block [Api_COMMUNITYPOST_TagCommunityBrief]
 * @apiSuccess (Api_COMMUNITYPOST_TagCommunityBrief) {int} id 标签id
 * @apiSuccess (Api_COMMUNITYPOST_TagCommunityBrief) {string} name 标签名称
 * @apiSuccess (Api_COMMUNITYPOST_TagCommunityBrief) {long} postCount 内容数
 * @apiSuccess (Api_COMMUNITYPOST_TagCommunityBrief) {string} tagType 标签类型 SIMPLE 普通标签, SYSTEM 系统标签 可见, SYSTEM_INVISIBLE 系统标签 不可见, TOPIC 话题标签
 *
 * @block [Api_COMMUNITYPOST_UserBrief]
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {long} id 用户的id
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} name 用户的昵称
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} avatar 用户的头像
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} userType 用户类型 COMMON 普通用户, OFFICIAL 官方账号, OFFICIAL_INSTITUTION 机构用户, OFFICIAL_UGC 官方UGC
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} website 内容供应商介绍地址
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} weibo 微博
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} wechat 微博
 * @apiSuccess (Api_COMMUNITYPOST_UserBrief) {string} chatType 联系方式 WEB 网址, WECHAT 微信, WEIBO 微博
 *
 * @block [Api_COMMUNITYPOST_ImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {List[Api_COMMUNITYPOST_TagInfo]} tagInfoList 标签信息
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
 *
 * @block [Api_COMMUNITYPOST_TagInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TagInfo) {int} id 标签ID
 * @apiSuccess (Api_COMMUNITYPOST_TagInfo) {string} name 标签名
 *
 * @block [Api_COMMUNITYPOST_ImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {List[Api_COMMUNITYPOST_TagInfo]} tagInfoList 标签信息
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
 *
 * @block [Api_COMMUNITYPOST_VideoInfo]
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {string} videoId 视频id
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {Api_COMMUNITYPOST_CoverImageInfo} coverImageInfo 视频封面图
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {List[Api_COMMUNITYPOST_VideoData]} videoDataList 视频清晰度列表
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {List[Api_COMMUNITYPOST_TagInfo]} tagInfoList 标签信息
 *
 * @block [Api_COMMUNITYPOST_CoverImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_CoverImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_CoverImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_CoverImageInfo) {int} height 图高度
 *
 * @block [Api_COMMUNITYPOST_VideoData]
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {string} transcodeMode 视频转码 FHD_40 超高清, HD_30 高清
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {string} videoUrl 视频url
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {long} videoSize 视频大小，字节
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {int} duration 视频时长，秒
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {int} height 高
 * @apiSuccess (Api_COMMUNITYPOST_VideoData) {int} width 宽
 *
 * @block [Api_COMMUNITYPOST_TagInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TagInfo) {int} id 标签ID
 * @apiSuccess (Api_COMMUNITYPOST_TagInfo) {string} name 标签名
 *
 * @block [Api_COMMUNITYPOST_SegmentInfo]
 * @apiSuccess (Api_COMMUNITYPOST_SegmentInfo) {string} url segment链接
 *
 * @block [Api_COMMUNITYPOST_TextInfo]
 * @apiSuccess (Api_COMMUNITYPOST_TextInfo) {string} text 文字
 *
 * @block [Api_COMMUNITYPOST_VideoInfo]
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {string} videoId 视频id
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {Api_COMMUNITYPOST_CoverImageInfo} coverImageInfo 视频封面图
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {List[Api_COMMUNITYPOST_VideoData]} videoDataList 视频清晰度列表
 * @apiSuccess (Api_COMMUNITYPOST_VideoInfo) {List[Api_COMMUNITYPOST_TagInfo]} tagInfoList 标签信息
 *
 * @block [Api_COMMUNITYPOST_ImageInfo]
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} id 图片素材ID
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} url 图片链接
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} width 图宽度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {int} height 图高度
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {List[Api_COMMUNITYPOST_TagInfo]} tagInfoList 标签信息
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} miniprogramAppId 小程序appId
 * @apiSuccess (Api_COMMUNITYPOST_ImageInfo) {string} linkUrl 跳转链接
 *
 * @block [Api_COMMUNITYPOST_SpuInfo]
 * @apiSuccess (Api_COMMUNITYPOST_SpuInfo) {int} spuId 商品ID
 * @apiSuccess (Api_COMMUNITYPOST_SpuInfo) {Api_PRODUCT_ProductInfo} productInfo 商品信息
 * @apiSuccess (Api_COMMUNITYPOST_SpuInfo) {string} spm spm
 *
 * @block [Api_PRODUCT_ProductInfo]
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} id 产品ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} mainImageUrl 题图
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} thumbnailUrl 缩略图
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} videoUrl 视频地址
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} imageUrl 会返回缩略图url,不推荐使用,如需要缩略图,请用thumbnailUrl
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} price 最小价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} maxPrice 最大价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} marketPrice 标签价
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} vipPrice VIP价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} svipPrice SVIP价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} groupbuyPrice 团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} vipGroupbuyPrice VIP团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} svipGroupbuyPrice SVIP团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} dailyPrice 日销价
 * @apiSuccess (Api_PRODUCT_ProductInfo) {Api_PRODUCT_SPUPriceInfo} priceInfo SPU价格字段
 * @apiSuccess (Api_PRODUCT_ProductInfo) {Api_PRODUCT_StockPrice3} stockPriceInfo 价格库存 (跟其他系统自动注入的定义一样, 方便前端统一处理)
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} originalName 原始商品名
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} productName 名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} productName2 名称2
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} brandId 品牌ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} brandName 品牌名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel1Id 一级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel1Name 一级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel2Id 二级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel2Name 二级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel3Id 三级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel3Name 三级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} channelId 发货渠道ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} channelName 发货渠道名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} supplierId 供应商ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} supplierName 供应商名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} promotionDescription 促销描述
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} secondTitle 摘要 (原 副标题)
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} stock 库存数量
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} onSale 是否上架
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} visibility 可见性 NOT_VISIBLE 无独立可见性, SEARCH 搜索可见
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} isCrowdfunding 是否为众筹
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} isGift 是否赠品
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} linkUrl 商品跳转链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} relativeLinkUrl 相对链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} directRelativeLinkUrl 排除玩法直接跳转商详相对链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} skuCount SKU数量
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[string]} tagList 标签描述,当前生效的,一个type筛选一个
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_BriefTag]} tagList2 用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_BriefTag]} directTagList 排除玩法的用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Tag]} allTagList 标签列表,全部的
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Indicator]} indicatorList 商品标识符
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Tag]} currentValidTagList 当前有效标签列表
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} minimumSellUnits 最低售卖件数
 *
 * @block [Api_PRODUCT_SPUPriceInfo]
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo) {Api_PRODUCT_SKUPriceInfo} minPriceInfo 最小SKU价格信息
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo) {Api_PRODUCT_SKUPriceInfo} maxPriceInfo 最大SKU价格信息
 *
 * @block [Api_PRODUCT_SKUPriceInfo]
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} dailyPrice 日销价格
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} directPrice 直购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} price 实际售价（拼团活动中取拼团价）
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} tagPrice 厂商指导价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} vipPrice 会员价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} groupBuyPrice 团购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} groupBuyVipPrice 团购会员价
 *
 * @block [Api_PRODUCT_SKUPriceInfo]
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} dailyPrice 日销价格
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} directPrice 直购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} price 实际售价（拼团活动中取拼团价）
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} tagPrice 厂商指导价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} vipPrice 会员价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} groupBuyPrice 团购价
 * @apiSuccess (Api_PRODUCT_SKUPriceInfo) {int} groupBuyVipPrice 团购会员价
 *
 * @block [Api_PRODUCT_StockPrice3]
 * @apiSuccess (Api_PRODUCT_StockPrice3) {int} id 产品ID
 * @apiSuccess (Api_PRODUCT_StockPrice3) {int} stock 库存数量
 * @apiSuccess (Api_PRODUCT_StockPrice3) {Api_PRODUCT_SPUPriceInfo} priceInfo SPU价格字段
 * @apiSuccess (Api_PRODUCT_StockPrice3) {boolean} onSale 是否上架
 * @apiSuccess (Api_PRODUCT_StockPrice3) {List[Api_PRODUCT_Indicator]} indicatorList 当前生效商品标识符
 * @apiSuccess (Api_PRODUCT_StockPrice3) {List[string]} tagList 标签描述
 * @apiSuccess (Api_PRODUCT_StockPrice3) {List[Api_PRODUCT_BriefTag]} tagList2 用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} productName 名称
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} originalName 原始商品名
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} secondTitle 摘要 (原 副标题)
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} linkUrl 商品跳转链接
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} relativeLinkUrl 相对链接
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} mainImageUrl 题图
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} thumbnailUrl 缩略图
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} videoUrl 视频地址
 * @apiSuccess (Api_PRODUCT_StockPrice3) {string} visibility 可见性 NOT_VISIBLE 无独立可见性, SEARCH 搜索可见
 *
 * @block [Api_PRODUCT_SPUPriceInfo]
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo) {Api_PRODUCT_SKUPriceInfo} minPriceInfo 最小SKU价格信息
 * @apiSuccess (Api_PRODUCT_SPUPriceInfo) {Api_PRODUCT_SKUPriceInfo} maxPriceInfo 最大SKU价格信息
 *
 * @block [Api_PRODUCT_Indicator]
 * @apiSuccess (Api_PRODUCT_Indicator) {string} type 类型 AUCTION 拍卖品, CANT_COUPON 不能使用优惠券, CANT_USE_USER_POINT 不能使用积分, CAN_NOT_PUSH_DELIVER 不可催发货, COLOR_500 500色铅笔, COMPANY_PURCHASE 企业购, CROWDFUNDING 众筹, DEPOSIT 保证金, DISTRIBUTABLE 分销, GIFT 赠品, GROUPBUY 拼团, HOT 爆款商品, MYRIAD_GROUPBUY 万人团, NEW 新品, NOT_GRANT_USER_POINT 不赠送积分, NOT_MANAGE_STOCK 不需要管理库存, NO_VIP 不享受VIP折扣, ON_LINE 线上销售, OVERSEAS 海淘, PACKING_SERVICE 包装服务, PRESELL 预售, PROCESSED_FOOD 加工食品, RETAIL_STORE 线下销售, SN 需要S/N码, TEST 测试商品, TRIAL 试用装商品, VIDEO 视频, VIP_TRIAL VIP试用, VIRTUAL 虚拟商品, YOOX YOOX商品
 * @apiSuccess (Api_PRODUCT_Indicator) {string} label 名称
 * @apiSuccess (Api_PRODUCT_Indicator) {date} startTime 开始时间
 * @apiSuccess (Api_PRODUCT_Indicator) {date} endTime 结束时间
 *
 * @block [Api_PRODUCT_BriefTag]
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} label 标签描述
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} color 标签颜色（十六进制带#）
 *
 * @block [Api_PRODUCT_BriefTag]
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} label 标签描述
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} color 标签颜色（十六进制带#）
 *
 * @block [Api_PRODUCT_BriefTag]
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} label 标签描述
 * @apiSuccess (Api_PRODUCT_BriefTag) {string} color 标签颜色（十六进制带#）
 *
 * @block [Api_PRODUCT_Tag]
 * @apiSuccess (Api_PRODUCT_Tag) {int} spuId SPU ID
 * @apiSuccess (Api_PRODUCT_Tag) {string} label 标签名
 * @apiSuccess (Api_PRODUCT_Tag) {string} type2 类型 BUSINESS_DISCOUNT 商业折扣, COUPON 优惠券, FLASH_SALE 闪购, GROUPBUY 团购, MARKETING 营销类
 * @apiSuccess (Api_PRODUCT_Tag) {int} activityId 活动ID
 * @apiSuccess (Api_PRODUCT_Tag) {date} startTime 开始时间
 * @apiSuccess (Api_PRODUCT_Tag) {date} endTime 结束时间
 * @apiSuccess (Api_PRODUCT_Tag) {double} promotionPrice 活动价
 * @apiSuccess (Api_PRODUCT_Tag) {double} vipPromotionPrice VIP活动价格
 * @apiSuccess (Api_PRODUCT_Tag) {double} svipPromotionPrice SVIP活动价格
 * @apiSuccess (Api_PRODUCT_Tag) {Api_PRODUCT_SpuTagPromotionPriceInfo} promotionPriceInfo 活动价格字段
 * @apiSuccess (Api_PRODUCT_Tag) {date} warmUpTime 预热开始时间
 * @apiSuccess (Api_PRODUCT_Tag) {boolean} isVipOnly VIP专享
 * @apiSuccess (Api_PRODUCT_Tag) {string} color 标签颜色（十六进制带#）
 * @apiSuccess (Api_PRODUCT_Tag) {string} type 弃用 BUSINESS_DISCOUNT 商业折扣, COUPON 优惠券, FLASH_SALE 闪购, GROUPBUY 团购, MARKETING 营销类
 * @apiSuccess (Api_PRODUCT_Tag) {boolean} approachEnd 弃用
 * @apiSuccess (Api_PRODUCT_Tag) {string} status 弃用 STARTED 已开始, STARTED_COMING_TO_END 已开始-快结束, WARMUP 预热中
 *
 * @block [Api_PRODUCT_SpuTagPromotionPriceInfo]
 * @apiSuccess (Api_PRODUCT_SpuTagPromotionPriceInfo) {int} promotionPrice 活动价
 * @apiSuccess (Api_PRODUCT_SpuTagPromotionPriceInfo) {int} vipPromotionPrice 会员活动价
 *
 * @block [Api_PRODUCT_Indicator]
 * @apiSuccess (Api_PRODUCT_Indicator) {string} type 类型 AUCTION 拍卖品, CANT_COUPON 不能使用优惠券, CANT_USE_USER_POINT 不能使用积分, CAN_NOT_PUSH_DELIVER 不可催发货, COLOR_500 500色铅笔, COMPANY_PURCHASE 企业购, CROWDFUNDING 众筹, DEPOSIT 保证金, DISTRIBUTABLE 分销, GIFT 赠品, GROUPBUY 拼团, HOT 爆款商品, MYRIAD_GROUPBUY 万人团, NEW 新品, NOT_GRANT_USER_POINT 不赠送积分, NOT_MANAGE_STOCK 不需要管理库存, NO_VIP 不享受VIP折扣, ON_LINE 线上销售, OVERSEAS 海淘, PACKING_SERVICE 包装服务, PRESELL 预售, PROCESSED_FOOD 加工食品, RETAIL_STORE 线下销售, SN 需要S/N码, TEST 测试商品, TRIAL 试用装商品, VIDEO 视频, VIP_TRIAL VIP试用, VIRTUAL 虚拟商品, YOOX YOOX商品
 * @apiSuccess (Api_PRODUCT_Indicator) {string} label 名称
 * @apiSuccess (Api_PRODUCT_Indicator) {date} startTime 开始时间
 * @apiSuccess (Api_PRODUCT_Indicator) {date} endTime 结束时间
 *
 * @block [Api_PRODUCT_Tag]
 * @apiSuccess (Api_PRODUCT_Tag) {int} spuId SPU ID
 * @apiSuccess (Api_PRODUCT_Tag) {string} label 标签名
 * @apiSuccess (Api_PRODUCT_Tag) {string} type2 类型 BUSINESS_DISCOUNT 商业折扣, COUPON 优惠券, FLASH_SALE 闪购, GROUPBUY 团购, MARKETING 营销类
 * @apiSuccess (Api_PRODUCT_Tag) {int} activityId 活动ID
 * @apiSuccess (Api_PRODUCT_Tag) {date} startTime 开始时间
 * @apiSuccess (Api_PRODUCT_Tag) {date} endTime 结束时间
 * @apiSuccess (Api_PRODUCT_Tag) {double} promotionPrice 活动价
 * @apiSuccess (Api_PRODUCT_Tag) {double} vipPromotionPrice VIP活动价格
 * @apiSuccess (Api_PRODUCT_Tag) {double} svipPromotionPrice SVIP活动价格
 * @apiSuccess (Api_PRODUCT_Tag) {Api_PRODUCT_SpuTagPromotionPriceInfo} promotionPriceInfo 活动价格字段
 * @apiSuccess (Api_PRODUCT_Tag) {date} warmUpTime 预热开始时间
 * @apiSuccess (Api_PRODUCT_Tag) {boolean} isVipOnly VIP专享
 * @apiSuccess (Api_PRODUCT_Tag) {string} color 标签颜色（十六进制带#）
 * @apiSuccess (Api_PRODUCT_Tag) {string} type 弃用 BUSINESS_DISCOUNT 商业折扣, COUPON 优惠券, FLASH_SALE 闪购, GROUPBUY 团购, MARKETING 营销类
 * @apiSuccess (Api_PRODUCT_Tag) {boolean} approachEnd 弃用
 * @apiSuccess (Api_PRODUCT_Tag) {string} status 弃用 STARTED 已开始, STARTED_COMING_TO_END 已开始-快结束, WARMUP 预热中
 *
 * @block [Api_PRODUCT_ProductInfo]
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} id 产品ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} mainImageUrl 题图
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} thumbnailUrl 缩略图
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} videoUrl 视频地址
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} imageUrl 会返回缩略图url,不推荐使用,如需要缩略图,请用thumbnailUrl
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} price 最小价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} maxPrice 最大价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} marketPrice 标签价
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} vipPrice VIP价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} svipPrice SVIP价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} groupbuyPrice 团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} vipGroupbuyPrice VIP团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} svipGroupbuyPrice SVIP团购价格
 * @apiSuccess (Api_PRODUCT_ProductInfo) {double} dailyPrice 日销价
 * @apiSuccess (Api_PRODUCT_ProductInfo) {Api_PRODUCT_SPUPriceInfo} priceInfo SPU价格字段
 * @apiSuccess (Api_PRODUCT_ProductInfo) {Api_PRODUCT_StockPrice3} stockPriceInfo 价格库存 (跟其他系统自动注入的定义一样, 方便前端统一处理)
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} originalName 原始商品名
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} productName 名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} productName2 名称2
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} brandId 品牌ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} brandName 品牌名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel1Id 一级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel1Name 一级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel2Id 二级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel2Name 二级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} categoryLevel3Id 三级后台分类ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} categoryLevel3Name 三级后台分类名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} channelId 发货渠道ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} channelName 发货渠道名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} supplierId 供应商ID
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} supplierName 供应商名称
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} promotionDescription 促销描述
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} secondTitle 摘要 (原 副标题)
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} stock 库存数量
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} onSale 是否上架
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} visibility 可见性 NOT_VISIBLE 无独立可见性, SEARCH 搜索可见
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} isCrowdfunding 是否为众筹
 * @apiSuccess (Api_PRODUCT_ProductInfo) {boolean} isGift 是否赠品
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} linkUrl 商品跳转链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} relativeLinkUrl 相对链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {string} directRelativeLinkUrl 排除玩法直接跳转商详相对链接
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} skuCount SKU数量
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[string]} tagList 标签描述,当前生效的,一个type筛选一个
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_BriefTag]} tagList2 用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_BriefTag]} directTagList 排除玩法的用于列表页展示的精简标签
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Tag]} allTagList 标签列表,全部的
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Indicator]} indicatorList 商品标识符
 * @apiSuccess (Api_PRODUCT_ProductInfo) {List[Api_PRODUCT_Tag]} currentValidTagList 当前有效标签列表
 * @apiSuccess (Api_PRODUCT_ProductInfo) {int} minimumSellUnits 最低售卖件数
 *
 * @block [Api_DynamicEntity]
 * @apiSuccess (Api_DynamicEntity) {[T]} entity 动态类型实体
 * @apiSuccess (Api_DynamicEntity) {string} typeName 动态类型的类型名
 *
 * @block [Api_COMMUNITYPOST_PostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {int} postId 内容id
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} type 内容类型 ARTICLE 长图文, IMAGES 普通图文, VIDEO 小视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_COMMUNITYPOST_TagCommunityBrief]} tagCommunityBriefList 标签列表
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} title 标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} subTitle 副标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} summary 摘要
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_UserBrief} userBrief 发布用户
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} postTime 发布时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} updateTime 更新时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} thumb 封面图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} listThumb 列表图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_VideoInfo} headVideoInfo 头部视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo, SpuInfo, 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} system 来源 AT 美学实验室, ATV 美学实验室心得, CENTER 内容平台, FOOD_VIDEO 美食台, HOUSE 一条house, LIFE_POST 生活贴, SF 二楼, YITCOM 一条生活馆, YIT_KT 一条课堂
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} postStatus 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} shareCount 分享数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} commentCount 评论数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} likeCount 点赞数
 *
 * @block [Api_COMMUNITYPOST_PostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {int} postId 内容id
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} type 内容类型 ARTICLE 长图文, IMAGES 普通图文, VIDEO 小视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_COMMUNITYPOST_TagCommunityBrief]} tagCommunityBriefList 标签列表
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} title 标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} subTitle 副标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} summary 摘要
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_UserBrief} userBrief 发布用户
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} postTime 发布时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} updateTime 更新时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} thumb 封面图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} listThumb 列表图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_VideoInfo} headVideoInfo 头部视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo, SpuInfo, 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} system 来源 AT 美学实验室, ATV 美学实验室心得, CENTER 内容平台, FOOD_VIDEO 美食台, HOUSE 一条house, LIFE_POST 生活贴, SF 二楼, YITCOM 一条生活馆, YIT_KT 一条课堂
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} postStatus 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} shareCount 分享数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} commentCount 评论数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} likeCount 点赞数
 *
 * @block [Api_COMMUNITYPOST_PostInfo]
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {int} postId 内容id
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} type 内容类型 ARTICLE 长图文, IMAGES 普通图文, VIDEO 小视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_COMMUNITYPOST_TagCommunityBrief]} tagCommunityBriefList 标签列表
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} title 标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} subTitle 副标题
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} summary 摘要
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_UserBrief} userBrief 发布用户
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} postTime 发布时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {date} updateTime 更新时间
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} thumb 封面图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_ImageInfo} listThumb 列表图
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {Api_COMMUNITYPOST_VideoInfo} headVideoInfo 头部视频
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {List[Api_DynamicEntity]} dynamicEntityList 内容信息 本字段为动态数据类型, 可能类型为以下种类:SegmentInfo, TextInfo, VideoInfo, ImageInfo, SpuInfo, 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} system 来源 AT 美学实验室, ATV 美学实验室心得, CENTER 内容平台, FOOD_VIDEO 美食台, HOUSE 一条house, LIFE_POST 生活贴, SF 二楼, YITCOM 一条生活馆, YIT_KT 一条课堂
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {string} postStatus 
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} shareCount 分享数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} commentCount 评论数
 * @apiSuccess (Api_COMMUNITYPOST_PostInfo) {long} likeCount 点赞数
 *
 * @block [Api_AESTHETICSLAB_Kol]
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {long} id id,修改kol时:有id 更新,无id 新增
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {Api_AESTHETICSLAB_ImageInfo} avatar 头像
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {string} name 名字
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {string} kolType 类型 1:嘉宾 2:主持人 GUEST 嘉宾, HOST 主持人
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {string} title 头衔
 * @apiSuccess (Api_AESTHETICSLAB_Kol) {string} description 简介
 *
 * @block [Api_AESTHETICSLAB_ImageInfo]
 * @apiSuccess (Api_AESTHETICSLAB_ImageInfo) {string} url 图片地址
 * @apiSuccess (Api_AESTHETICSLAB_ImageInfo) {short} height 图片高度
 * @apiSuccess (Api_AESTHETICSLAB_ImageInfo) {short} width 图片宽度
 *
 * @block [Api_AESTHETICSLAB_RoundInfo]
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {long} roundId 场次ID
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {int} roundNumber 第几场
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {date} signUpBeginTime 报名开始时间
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {date} signUpEndTime 报名结束时间
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {date} roundBeginTime 场次开始时间
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {date} roundEndTime 场次结束时间
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {Api_STORE_StoreCommonEntity} storeInfo 门店信息
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {int} storeId 门店id
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {date} attendeePublishTime 出席人名单公布时间
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {int} remainNum 报名剩余人数, 仅优先制有值，筛选制无值
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {string} roundState 场次状态 ROUND_END 已结束, ROUND_UNDER_WAY 进行中, SIGN_UP_END 报名截止, SIGN_UP_NOT_START 预告, SIGN_UP_UNDER_WAY 报名中, SIGN_UP_UPPER_LIMIT 额满
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {string} livePlatform 直播平台 FOODVIDEO 美食台, UNKOWN 无, YITIAO 一条
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {string} liveUrl 直播地址
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {string} liveReviewPlatform 回播平台 FOODVIDEO 美食台, UNKOWN 无, YITIAO 一条
 * @apiSuccess (Api_AESTHETICSLAB_RoundInfo) {string} liveReviewUrl 回播地址
 *
 * @block [Api_STORE_StoreCommonEntity]
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} id 门店ID
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} name 门店名称
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} nameAbbreviation 门店简称
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} thumbImgUrl 门店图片
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} address 门店地址
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} province 省
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} provinceCode 省编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} city 市
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} cityCode 市编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} region 区
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} regionCode 区编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} location 地理位置坐标
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} trafficDirections 交通指导
 * @apiSuccess (Api_STORE_StoreCommonEntity) {date} startBusinessTime 开业时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} openingTime 营业开始时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} closingTime 打烊时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {boolean} showInAestheticLaboratory 是否在美学实验室展示
 * @apiSuccess (Api_STORE_StoreCommonEntity) {List[Api_STORE_StoreServeItem]} storeServeItems 设施服务
 * @apiSuccess (Api_STORE_StoreCommonEntity) {List[Api_STORE_StoreEnvPicture]} storeEnvPictures 门店环境图
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} storeMapUrl 门店地图URL
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} surfacePlotUrl 门店封面图
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} storeEnvPictureTotal 门店环境图数量
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} ip 基站外网IP
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} organizationId 组织架构ID
 *
 * @block [Api_STORE_StoreServeItem]
 * @apiSuccess (Api_STORE_StoreServeItem) {int} id 服务项 ID
 * @apiSuccess (Api_STORE_StoreServeItem) {string} description 描述
 * @apiSuccess (Api_STORE_StoreServeItem) {string} imageUrl 图片url
 *
 * @block [Api_STORE_StoreEnvPicture]
 * @apiSuccess (Api_STORE_StoreEnvPicture) {string} picUrl 图片URL
 * @apiSuccess (Api_STORE_StoreEnvPicture) {boolean} isSurfacePlot 是否是封面图
 * @apiSuccess (Api_STORE_StoreEnvPicture) {int} height 高
 * @apiSuccess (Api_STORE_StoreEnvPicture) {int} width 宽
 *
 * @block [Api_STORE_StoreCommonEntity]
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} id 门店ID
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} name 门店名称
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} nameAbbreviation 门店简称
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} thumbImgUrl 门店图片
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} address 门店地址
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} province 省
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} provinceCode 省编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} city 市
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} cityCode 市编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} region 区
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} regionCode 区编码
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} location 地理位置坐标
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} trafficDirections 交通指导
 * @apiSuccess (Api_STORE_StoreCommonEntity) {date} startBusinessTime 开业时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} openingTime 营业开始时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} closingTime 打烊时间
 * @apiSuccess (Api_STORE_StoreCommonEntity) {boolean} showInAestheticLaboratory 是否在美学实验室展示
 * @apiSuccess (Api_STORE_StoreCommonEntity) {List[Api_STORE_StoreServeItem]} storeServeItems 设施服务
 * @apiSuccess (Api_STORE_StoreCommonEntity) {List[Api_STORE_StoreEnvPicture]} storeEnvPictures 门店环境图
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} storeMapUrl 门店地图URL
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} surfacePlotUrl 门店封面图
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} storeEnvPictureTotal 门店环境图数量
 * @apiSuccess (Api_STORE_StoreCommonEntity) {string} ip 基站外网IP
 * @apiSuccess (Api_STORE_StoreCommonEntity) {int} organizationId 组织架构ID
 *
 *
 */