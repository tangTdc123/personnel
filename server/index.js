const express = require('express')
// const jwt = require('jsonwebtoken')
const app = express()
const mongoose = require('mongoose')
app.use(require('cors')())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('a')
})

//显示学生列表：
app.get('/api/getpersonnelList', async (req, res) => {
    const personnels = await Personnel.find()
    res.send(personnels)
})

//录入
app.post('/api/personnels', async (req, res) => {
    const personnel = await Personnel.create(req.body)

    res.send(personnel)
})
//删除：
app.delete('/api/personnel/:id', async (req, res) => {

    await Personnel.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})
//修改
app.get('/api/update/:id', async (req, res) => {
    const personnel = await Personnel.findById(req.params.id)
    res.send(personnel)
})
//更新
app.put('/api/confirmUpdata/:id', async (req, res) => {
    const personnel = await Personnel.findByIdAndUpdate(req.params.id, req.body)
    res.send(personnel)
})
//根据身份证号查询
app.get('/api/findBySnumber/:snumber', async (req, res) => {
    const personnel = await Personnel.find({ 'number': req.params.snumber })
    res.send(personnel)
})
//根据姓名模糊查询：
app.get('/api/findByName/:names', async (req, res) => {
    var query = new RegExp(req.params.names)
    const personnel = await Personnel.find({ $or: [{ "name": query }] })
    res.send(personnel)

})

//姓名模糊分页查询:
app.get('/api/findByName', (req, res) => {
    result = {
        data: {},
        total: ''
    }
    var confident = new RegExp(req.query.names)
    //总记录数
    var query = Personnel.find({ $or: [{ "name": confident }] });
    query.count({}, function (err, count) {
        if (err) {
            res.json(err)
        } else {
            result.total = count;

        }
    })
    //第几页和每页大小
    pageSize = parseInt(req.query.pageSize)
    currentPage = parseInt(req.query.currentPage)
    Personnel.find({}, (err, data) => {
        result.data = data
        res.send(result)
    }).where({ $or: [{ "name": confident }] }).skip((currentPage - 1) * pageSize).limit(pageSize)

})
//分页列表：
app.all('/api/personnelList', async (req, res) => {
    result = {
        data: [],
        total: ''
    }
    var confident = new RegExp(req.query.names)
    //总记录数
    var query = Personnel.find({});
    query.count({}, function (err, count) {
        if (err) {
            res.json(err)
        } else {
            result.total = count;

        }
    })
    //第几页和每页大小
    pageSize = parseInt(req.query.pageSize)
    currentPage = parseInt(req.query.currentPage)
    Personnel.find({}, (error, data) => {
        result.data = data
        res.send(result)
    }).skip((currentPage - 1) * pageSize).limit(pageSize)

})
//注册
app.post('/api/users', async (req, res) => {

    if (req.body.rootpassword == '1234') {

        const personnel = await User.find({ "name": req.body.name })
        if (personnel == '') {
            const user = await User.create(req.body)
            res.send({user})
        } else {
            res.send('flase1')
        }

    }
    else {
        res.send('flase')
    }

})
//登录
app.get('/api/findBySname/:sname', async (req, res) => {
    const user = await User.find({ 'name': req.params.sname })
    res.send(user)

})



mongoose.connect('mongodb://127.0.0.1/personnel', {
    useNewUrlParser: true,
})



const Personnel = mongoose.model('Personnel', new mongoose.Schema({
    number: { type: String },
    name: { type: String },
    age: { type: String },
    chushengriqi: { type: String },
    sex: { type: String },
    address: { type: String },

}))

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    rootpassword: { type: String }
}))

app.listen(3001, () => {
    console.log('success')
})


