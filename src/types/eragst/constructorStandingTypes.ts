interface Constructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

interface ConstructorStanding {
  "position": string,
  "positionText": string,
  "points": string,
  "wins": string,
  "Constructor": Constructor
}

interface StandingsList {
  season: string,
  round: string,
  ConstructorStandings: ConstructorStanding[]
}

interface StandingsTable {
  season: string
  round: string
  StandingsLists: StandingsList[]
}

interface MRData {
  "xmlns": string,
  "series": string,
  "url": string
  "limit": string
  "offset": string
  "total": string
  "StandingsTable": StandingsTable
}

export interface ConstructorStanding_Response {
  MRData: MRData
}

