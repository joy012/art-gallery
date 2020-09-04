import quoteCard from './quoteCard';
import lyricCard from './lyricCard';


const data = [...quoteCard,...lyricCard];


const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(data);

export default data;