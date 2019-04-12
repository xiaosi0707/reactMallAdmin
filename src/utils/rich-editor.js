/**
 @Author：Wyunfei
 @Date：2019/4/12/14:23
 @FileName: rich-editor.js
 */
import React from 'react'
import $ from 'jquery'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

class RichEditor extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.loadEditor()
    }
    loadEditor() {
        let element = this.refs['textarea']
        new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容'
        })
    }
    render() {
        return (
            <div className='row'>
                <textarea ref='textarea'></textarea>
            </div>
        )
    }
}
export default RichEditor
