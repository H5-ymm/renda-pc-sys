import { post, $post } from '../axios'

export const changeConfig = data => post('/config/changeConfig', data);

export const getFkeyword = () => post('/config/getFkeyword');

export const saveFkeyword = (data) => $post('/config/saveFkeyword', data);