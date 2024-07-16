export interface Author {
  name?: string;
  picture?: any;
}

export interface Member {
  name: string;
  picture?: {
    asset: {
      _ref: string;
      _type: string;
    };
    crop: {
      right: number;
      top: number;
      left: number;
      bottom: number;
      _type: string;
    };
    hotspot: {
      width: number;
      x: number;
      y: number;
      height: number;
      _type: string;
    };
    _type: string;
    alt: string;
  };
  officerPosition?: string;
  favoriteBrew?: string;
  badges?: ("bjcpCertified" | "homebrewer" | "brewEnthusiast")[];
}

export interface Post {
  _id: string;
  title?: string;
  coverImage?: any;
  date?: string;
  _updatedAt?: string;
  excerpt?: string;
  author?: Author;
  slug?: string;
  content?: any;
}

export interface Event {
  _id: string;
  _type: string;
  name?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface Resource {
  _id: string;
  _type: string;
  name?: string;
  description?: string;
  fileUrl?: string;
}

export interface Brew {
  _id: string;
  _type: string;
  name?: string;
  brewer: Member;
  style: string;
  ingredients: {
    amount: number;
    unit: string;
    name: string;
  }[];
  description?: string;
  brewDates: {
    yeastPrepDate?: string;
    brewDate?: string;
    conditioningDate?: string;
    endDate: string;
  };
  software?: string;
  equipment?: string;
}
