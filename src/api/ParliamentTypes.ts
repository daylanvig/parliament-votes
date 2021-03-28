
export interface ParliamentAPIData<T> {
  pagination: Pagination;
  objects: T[];
}

export interface Pagination {
  next_url?: string;
  limit: number;
  previous_url?: string;
  offset: number;
}

export interface CurrentRiding {
  province: string;
  name: LocaleString;
}

export interface LocaleString {
  en: string;
  // todo: fr?
}

export interface CurrentParty {
  short_name: LocaleString;
}

export interface ParliamentPolitician {
  url: string;
  image: string;
  current_riding: CurrentRiding;
  name: string;
  current_party: CurrentParty;
}

export interface ParliamentBill {
  name: LocaleString;
  url: string;
  number: string;
  session: string;
  introduced: string;
  legisinfo_id: number;
}

export interface ParliamentBallotVote {
  politician_membership_url: string;
  ballot: string; // "Yes", "No", "Paired", "Didn't vote"
  politician_url: string;
  vote_url: string;
}

export interface ParliamentVote {
  result: string;
  url: string;
  session: string;
  bill_url: string;
  nay_total: number;
  date: string;
  yea_total: number;
  paired_total: number;
  number: number;
  description: LocaleString;
}