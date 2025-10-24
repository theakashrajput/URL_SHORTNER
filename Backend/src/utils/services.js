import { nanoid } from 'nanoid'

export const generateNanoId = () => {
    return nanoid();
};

export const isURLValid = (url)=>{
    return new URL(url);
}