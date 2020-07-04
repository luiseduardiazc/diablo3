import { get } from 'axios'
import store from '../store/index'
import { locales } from '../utils/regions'

// https://{region}.api.blizzard.com, where {region} can be 'us', 'eu', 'kr' o 'tw'
const protocol = 'https://'
const host = '.api.blizzard.com/'

/**
 * Returns the specified account profile.
 * GET – /d3/profile/{account}
 * Los parámetros que hemos obtenido a través de la URL
 *  - @param region {String}
 *  - @param account {String}
 * @returns {Promise}
 */
function getApiAccount ({ region, account }) {
  const resource = `d3/profile/${account}/`

  const API_URL = `${protocol}${region}${host}${resource}`
  const locale = locales[region]

  const params = {
    access_token: store.state.oauth.accessToken,
    locale
  }

  return get(API_URL, { params })
}

export {
  getApiAccount
}
