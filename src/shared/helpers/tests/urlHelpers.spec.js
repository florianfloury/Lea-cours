import {E_ENV, E_HOST, E_URL_SCHEME, parseUrl} from '../urlHelpers'

describe('urlHelpers', () => {
  it('func defined', () => {
    expect(parseUrl).toBeDefined()
  })

  describe('parseUrl', () => {
    const realm = 'quicksign'
    const path = 'cases'
    const responseTemplate = (urlScheme, realm, host, env, path, basePath) => ({
      urlScheme,
      realm,
      host,
      env,
      basePath: basePath || '',
      path,
    })
    const defaultResponse = responseTemplate(E_URL_SCHEME.LOCAL, realm, E_HOST.QPC, E_ENV.DEV, '', '')

    it('default if no domain or no pathname', () => {
      const result = parseUrl(undefined, undefined)

      expect(result).toEqual(defaultResponse)
    })
    it('default if wrong host', () => {
      const result = parseUrl('https://random.random.com/')

      expect(result).toEqual(defaultResponse)
    })

    describe('url with qpcRegex', () => {
      const qpcDomainTemplate = (env) => `${env}.quicksign.com`
      const qpcPathTemplate = (realm, path, basePath) => (basePath ? `${basePath}/${realm}/${path}` : `/${realm}/${path}`)

      it('no basePath', () => {
        const pathExpected = `/${realm}/${path}`
        const qpcDevDomain = qpcDomainTemplate(E_ENV.DEV)
        const qpcDevPath = qpcPathTemplate(realm, path)

        const expectedResult = responseTemplate(E_URL_SCHEME.QPC, realm, E_HOST.QPC, E_ENV.DEV, pathExpected)
        const result = parseUrl(qpcDevDomain, qpcDevPath)

        expect(result).toEqual(expectedResult)
      })
      it('with basePath', () => {
        const basePath = '/mo/app-v2'
        const pathExpected = `/${realm}/${path}`
        const qpcDevDomain = qpcDomainTemplate(E_ENV.DEV)
        const qpcDevPath = qpcPathTemplate(realm, path, basePath)

        const expectedResult = responseTemplate(E_URL_SCHEME.QPC, realm, E_HOST.QPC, E_ENV.DEV, pathExpected, basePath)
        const result = parseUrl(qpcDevDomain, qpcDevPath)

        expect(result).toEqual(expectedResult)
      })

      it('with wrong basePath', () => {
        const basePath = '/wrong/app-v2'
        const qpcDevDomain = qpcDomainTemplate(E_ENV.DEV)
        const qpcDevPath = qpcPathTemplate(realm, path, basePath)

        const expectedResult = responseTemplate(
          E_URL_SCHEME.QPC,
          'wrong',
          E_HOST.QPC,
          E_ENV.DEV,
          `${basePath}/${realm}/${path}`,
        ) // cause if wrong basePath first member is understood as realm
        const result = parseUrl(qpcDevDomain, qpcDevPath)

        expect(result).toEqual(expectedResult)
      })

      it('with complex path', () => {
        const basePath = '/mo/app-v2'
        const complexPath = `${path}/showcase:5AX3ZUNJV7-HXLLZXLTUF-MXJ35VIEXU-JHPTGDBMRZ3GGPA`
        const qpcDevDomain = qpcDomainTemplate(E_ENV.DEV)
        const qpcDevPath = qpcPathTemplate(realm, complexPath, basePath)

        const expectedResult = responseTemplate(
          E_URL_SCHEME.QPC,
          realm,
          E_HOST.QPC,
          E_ENV.DEV,
          `/${realm}/${complexPath}`,
          basePath,
        )
        const result = parseUrl(qpcDevDomain, qpcDevPath)

        expect(result).toEqual(expectedResult)
      })
    })

    describe('url with gcpMiddle regex', () => {
      const gcpMiddleDomainTemplate = (env, basePath) => `middle${basePath}.${env}.quicksign.io`
      const gcpMiddlePathTemplate = (realm, path) => `/${realm}/${path}`

      it('no basePath', () => {
        const pathExpected = `/${realm}/${path}`
        const gcpDevDomain = gcpMiddleDomainTemplate(E_ENV.DEV, '')
        const gcpDevPath = gcpMiddlePathTemplate(realm, path)

        const expectedResult = responseTemplate(E_URL_SCHEME.GCP_MIDDLE, realm, E_HOST.GCP, E_ENV.DEV, pathExpected)
        const result = parseUrl(gcpDevDomain, gcpDevPath)

        expect(result).toEqual(expectedResult)
      })
      it('with basePath', () => {
        const pathExpected = `/${realm}/${path}`
        const gcpDevDomain = gcpMiddleDomainTemplate(E_ENV.DEV, '-v2')
        const gcpDevPath = gcpMiddlePathTemplate(realm, path)

        const expectedResult = responseTemplate(E_URL_SCHEME.GCP_MIDDLE, realm, E_HOST.GCP, E_ENV.DEV, pathExpected)
        const result = parseUrl(gcpDevDomain, gcpDevPath)

        expect(result).toEqual(expectedResult)
      })

      it('with complex path', () => {
        const complexPath = `${path}/showcase:5AX3ZUNJV7-HXLLZXLTUF-MXJ35VIEXU-JHPTGDBMRZ3GGPA`
        const pathExpected = `/${realm}/${complexPath}`
        const gcpDevDomain = gcpMiddleDomainTemplate(E_ENV.DEV, '-v2')
        const gcpDevPath = gcpMiddlePathTemplate(realm, complexPath)

        const expectedResult = responseTemplate(E_URL_SCHEME.GCP_MIDDLE, realm, E_HOST.GCP, E_ENV.DEV, pathExpected)
        const result = parseUrl(gcpDevDomain, gcpDevPath)

        expect(result).toEqual(expectedResult)
      })
    })
    // No configuration for this scheme so no basePath // https://qs.dev.quicksign.io/
    describe('url with gcp regex', () => {
      const gcpDomainTemplate = (env) => `${realm}.${env}.quicksign.io`
      const gcpPathTemplate = (path) => `/${path}`

      it('return gcp scheme params with right url', () => {
        const pathExpected = `/${path}`
        const gcpDevDomain = gcpDomainTemplate(E_ENV.DEV)
        const gcpDevPath = gcpPathTemplate(path)

        const expectedResult = responseTemplate(E_URL_SCHEME.GCP, realm, E_HOST.GCP, E_ENV.DEV, pathExpected)
        const result = parseUrl(gcpDevDomain, gcpDevPath)

        expect(result).toEqual(expectedResult)
      })
      it('return default param with wrong url', () => {
        const pathExpected = `/${path}`
        const gcpDevDomain = gcpDomainTemplate(E_ENV.DEV)
        const gcpDevPath = gcpPathTemplate(path)

        const expectedResult = responseTemplate(E_URL_SCHEME.GCP, realm, E_HOST.GCP, E_ENV.DEV, pathExpected)
        const result = parseUrl(gcpDevDomain, gcpDevPath)

        expect(result).toEqual(expectedResult)
      })
    })
  })
})
