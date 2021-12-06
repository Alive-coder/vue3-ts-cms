import IoRequest from '@/network'

export function getPageListData(url: string, queryInfo: any){
  return IoRequest.post({
    url: url,
    data: queryInfo
  })
}
