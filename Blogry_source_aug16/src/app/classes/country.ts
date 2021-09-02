export interface Country {
  id: number,
  name: string,
  iso3: string,
  iso2: string,
  phone_code: string,
  capital: string,
  currency: string,
  currency_symbol: string,
  tld: string,
  native: string,
  region: string,
  subregion: string,
  timezones: [
    {
      zoneName: string,
      gmtOffset: number,
      gmtOffsetName: string,
      abbreviation: string,
      tzName: string,
    }
  ],
  translations: {
    br: string,
    pt: string,
    nl: string,
    hr: string,
    fa: string,
    de: string,
    es: string,
    fr: string,
    ja: string,
    it: string,
  },
  latitude: string,
  longitude: string,
  emoji: string,
  emojiU: string
}
