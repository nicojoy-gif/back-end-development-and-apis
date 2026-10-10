import { Router } from "express";
const router = Router()


router.get('/form', (req, res) => {
    res.send(express.static('/public/index.html'))
})
router.get('/', (req, res) =>{
    res.redirect('/form')
})

export default Router