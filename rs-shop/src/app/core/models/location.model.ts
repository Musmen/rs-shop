export interface ILocation {
  city: string,
  state_prov: string,
  district: string,
  country_capital: string,
  country_name: string,
}

export interface ITranslatedLocationResponse {
  results: {
    components: {
      city?: string,
      town?: string,
      village?: string,
      county?: string,
    }
  }[],
}
