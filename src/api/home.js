import httpRequest from '@/utils/httpRequest';

export const getData = () => httpRequest.request({ url: '/api' });
export default {};
