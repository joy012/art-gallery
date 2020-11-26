const uuidv4 = require("uuid/v4")

let illustration = [
    {
        key: `${uuidv4()}`,
        category: 'illustration',
        name: '',
        image: '',
        price: 0,
        sizeWithFrame: '',
        sizeWithOutFrame: '',
        Frame: '',
        description: ''
    }
]

export default illustration;