export interface Farmer {
  name: string;
  city: string;
}

export interface From {
  name: string;
}

export interface To {
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface FarmModel {
  _id: string;
  id?: string;
  type: string;
  amount_of_milk_produced: number;
  farmer: Farmer;
  from: From;
  to: To;
  number_of_cows_head: number;
  had_supervision: boolean;
  location: Location;
  created_at: Date;
  updated_at: Date;
  __v?: number;
}
