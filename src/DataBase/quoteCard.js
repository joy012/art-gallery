const randomKey = Math.round(Math.random() * (999 - 100)) + 100;

let quoteCard = [
    {
        key: randomKey,
        category: 'quote',
        name: '',
        image: '',
        price: 0,
        description: ''
    }
]

export default quoteCard;