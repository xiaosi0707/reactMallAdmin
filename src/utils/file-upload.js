/**
 @Author：Wyunfei
 @Date：2019/4/12/11:05
 @FileName: file-upload.js
 */
import React from 'react'
import FileUpload   from './react-fileupload.js';

class FileUploader extends React.Component{
    render() {
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,
            uploadSuccess(res) {
                console.log(res)
            },
            uploadError(err) {
                console.log(err)
            }

        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-sm btn-default" ref="chooseAndUpload">上传图片</button>
            </FileUpload>
        )
    }
}
export default FileUploader

