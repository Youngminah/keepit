export const DOMAIN = "https://www.naver.com"

export const BASE_URL = `https://${DOMAIN}`

export const API_BASE_URL = ' https://staging-api.keepit.site/api'


export const IS_DEV_MODE = !('update_url' in chrome.runtime.getManifest())

export const DEFAULT_LANG = 'en'
export const SUPPORTED_LANGS = ['en', 'ko']
