interface Driver {
  "driverId": string,
  "permanentNumber": string,
  "code": string,
  "url": string,
  "givenName": string,
  "familyName": string,
  "dateOfBirth": string,
  "nationality": string
}

interface Constructor {
  "constructorId": string,
  "url": string
  "name": string
  "nationality": string
}

interface DriverStanding {
  "position": string
  "positionText": string
  "points": string
  "wins": string
  "Driver": Driver
  "Constructors": Constructor[]
}

interface StandingsList {
  "season": string
  "round": string
  DriverStandings: DriverStanding[]
}

interface StandingsTable {
  "season": "2024",
  "round": "24",
  "StandingsLists": StandingsList[]
}

interface MRData {
  "xmlns": string,
  "series": string
  "url": string
  "limit": string
  "offset": string
  "total": string
  "StandingsTable": StandingsTable
}

interface DriverStandings_Response {
  MRData: MRData
}

