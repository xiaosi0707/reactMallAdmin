/**
 @Author：Wyunfei
 @Date：2019/4/8/20:18
 @FileName: user-service.js
 */

import Util from '../utils/mm.js';

const _mm = new Util();

class Statistic {
    // 首页数据统计
    getHomeCount() {
        return _mm.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic
