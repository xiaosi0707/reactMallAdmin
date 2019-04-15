/**
 @Author：Wyunfei
 @Date：2019/4/11/11:04
 @FileName: save.js
 */
import React from 'react'
import PageTitle from '../../../components/page-title/index.js';
import CategorySelector from './category-selector';
import FileUploader from '../../../utils/file-upload';
import RichEditor from '../../../utils/rich-editor'
import Mutil from '../../../utils/mm.js'
import './save.scss'
import Product from '../../../service/product-service.js'
const _mm = new Mutil()
const _product = new Product()

// import Axios from 'axios'
// import Qs from 'qs'

class ProductSave extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            name: '',
            price: '',
            stock: '',
            detail: '',
            status: 1 // 商品状态 1 待售
        }
    }
    componentDidMount() {
        this.loadProduct()
    }
    // 加载商品详情
    loadProduct() {
        // 有id的时候，表示是编辑
        if(this.state.id){
            _product.getdetail(this.state.id).then((res) => {
                console.log(res)
                this.getSubImage(res);
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //将uri数组转变成与uploader返回值一样的{uri,url}形式数组，方便显示图片
    getSubImage(res){
        let images = res.subImages.split(',');
        res.subImages = images.map((imgUri) => {
            return {
                uri: imgUri,
                url: res.imageHost + imgUri
            }
        });
    }
    // 接收子组件传递过来的数据
    onCategoryChange(categoryId, parentCategoryId) {
        console.log(categoryId, parentCategoryId)
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })

    }
    // 上传图片成功
    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages
        })
    }
    // 上传图片失败
    onUploadError(error) {
        _mm.errorTips(error.message || `上传图片失败`)
    }
    // 删除图片
    onImageDelete(e) {
        let index       = parseInt(e.target.getAttribute('index')),
            subImages   = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages : subImages
        });
    }
    // 富文本编辑器的变化
    onDetailValueChange(value){
        this.setState({
            detail: value
        });
    }
    // 基础字段
    onValueChange(e) {
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    getSubImagesString(){
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    // 提交表单
    onSubmit(e) {
        let product = {
                name        : this.state.name,
                subtitle    : this.state.subtitle,
                categoryId  : parseInt(this.state.categoryId),
                subImages   : this.getSubImagesString(),
                detail      : this.state.detail,
                price       : parseFloat(this.state.price),
                stock       : parseInt(this.state.stock),
                status      : this.state.status
            }
        let productCheckResult = _product.checkProduct(product);
        if(this.state.id){
            product.id = this.state.id;
        }
        // 表单验证成功
        if(productCheckResult.status){
            _product.saveProduct(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else{
            _mm.errorTips(productCheckResult.msg);
        }
    }
    // sub() {
    //     let obj = {
    //         token: 'f53a16f3-4eff-44b2-9594-5f11c15819b3',
    //         orderId:"785798",
    //         reputations:[
    //             {
    //                 id:"99764",
    //                 reputation:"2",
    //                 remark:"不错好"
    //             }
    //         ]
    //     }
    //     let data = {
    //         postJsonString: JSON.stringify(obj)
    //     }
    //     Axios({
    //         method: 'post',
    //         url: 'https://api.it120.cc/small4/order/reputation',
    //         data: Qs.stringify(data)
    //     })
    // }
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
                                           name='name'
                                           value={this.state.name}
                                           onChange={ e => this.onValueChange(e)}

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
                                           value={this.state.subtitle}
                                           onChange={e =>this.onValueChange(e)}
                                          />
                                </div>
                            </div>
                            <CategorySelector
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId}
                                onCategoryChange = { (categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId) }
                                />
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品价格</label>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number"
                                               name="price"
                                               value={this.state.price}
                                               className="form-control"
                                               placeholder="价格"
                                               onChange={e =>this.onValueChange(e)}
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
                                               value={this.state.stock}
                                               onChange={e =>this.onValueChange(e)}
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
                                    {
                                        this.state.subImages.length ? this.state.subImages.map(
                                            (image, index) => (
                                                <div className="img-con" key={index}>
                                                    <img className="img" src={image.url} />
                                                    <i className="fa fa-close" index={index}
                                                       onClick={(e) => this.onImageDelete(e)}></i>
                                                </div>)
                                        ) : (<div >请上传图片</div>)
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10 file-upload-con">
                                    <FileUploader onSuccess={res => this.onUploadSuccess(res)}
                                                  onError={error => this.onUploadError(error)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-2">
                                    <label className="control-label">商品详情</label>
                                </div>
                                <div className="col-md-10">
                                    <RichEditor detail={this.state.detail}
                                                defaultDetail={this.state.defaultDetail}
                                                onValueChange={(value) => this.onDetailValueChange(value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10 col-md-offset-2">
                                    <div className="btn btn-primary"
                                         onClick={e => this.onSubmit(e)}
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
