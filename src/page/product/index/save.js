/**
 @Author：Wyunfei
 @Date：2019/4/11/11:04
 @FileName: save.js
 */
import React from 'react'
import PageTitle from '../../../components/page-title/index.js';
import CategorySelector from './category-selector';

class ProductSave extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            categoryId: 0,
            parentCategoryId: 0
        }
    }
    // 接收子组件传递过来的数据
    onCategoryChange(categoryId, parentCategoryId) {
        console.log(categoryId, parentCategoryId)

    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='添加商品' />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品名称</label>
                                </div>
                                <div className="col-md-5">
                                    <input type="text" name="name" className="form-control"
                                           placeholder="请输入商品名称"

                                           />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品描述</label>
                                </div>
                                <div className="col-md-5">
                                    <input type="text" name="subtitle"
                                           className="form-control"
                                           placeholder="请输入商品描述"
                                          />
                                </div>
                            </div>
                            <CategorySelector
                                onCategoryChange = { (categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId) }
                                />
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品价格</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" name="price"
                                               className="form-control"
                                               placeholder="价格"
                                              />
                                        <span className="input-group-addon">元</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品库存</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" name="stock"
                                               className="form-control"
                                               placeholder="库存"
                                               />
                                        <span className="input-group-addon">件</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品图片</label>
                                </div>
                                <div className="col-md-10">
                                    {/*{*/}
                                        {/*this.state.subImages.length ? this.state.subImages.map(*/}
                                            {/*(image, index) => (*/}
                                                {/*<div className="img-con" key={index}>*/}
                                                    {/*<img className="img" src={image.url} />*/}
                                                    {/*<i className="fa fa-close" index={index}*/}
                                                       {/*onClick={(e) => this.onImageDelete(e)}></i>*/}
                                                {/*</div>)*/}
                                        {/*) : (<div >请上传图片</div>)*/}
                                    {/*}*/}
                                </div>
                                <div className="col-md-offset-2 col-md-10 file-upload-con">
                                    {/*<FileUploader onSuccess={(res) => this.onUploadSuccess(res)}*/}
                                                  {/*onError={(errMsg) => this.onUploadError(errMsg)}/>*/}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品详情</label>
                                </div>
                                <div className="col-md-10">
                                    {/*<RichEditor*/}
                                        {/*detail={this.state.detail}*/}
                                        {/*defaultDetail={this.state.defaultDetail}*/}
                                        {/*onValueChange={(value) => this.onDetailValueChange(value)}/>*/}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10 col-md-offset-2">
                                    <div className="btn btn-primary"
                                         >提交</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave
