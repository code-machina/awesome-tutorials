const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    // res.send('Hello world'); // 
    res.render('index', {
        title: "렌더링 in 익스프레스",
        message: "안녕하세요 pug 템플릿 엔진의 Rendered 된 내용입니다."
    })
})

module.exports = router;