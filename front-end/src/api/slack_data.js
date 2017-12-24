import request from '@/utils/request'

export function get_all_team() {
  return request({
    url: '/api/team',
    method: 'get'
  })
}
