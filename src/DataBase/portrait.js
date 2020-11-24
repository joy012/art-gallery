const uuidv4 = require("uuid/v4")

let portrait = [
    {
        key: `${uuidv4()}`,
        category: 'portrait',
        name: '',
        image: '',
        price: 0,
        sizeWithFrame: '',
        sizeWithOutFrame: '',
        Frame: '',
        description: ''
    }
]

export default portrait;