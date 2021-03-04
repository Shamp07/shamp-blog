import { axios } from 'axios';

export const axiosWrap = (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data: any,
    isServer: boolean,
) => {
    axios[method].then(

    )
}