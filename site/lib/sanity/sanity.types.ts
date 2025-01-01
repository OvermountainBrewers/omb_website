import { PortableTextBlock } from "next-sanity";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { ImageMetadata } from "@sanity/types";

export interface SanityAbout {
  body: PortableTextBlock[];
}

export interface SanityAuthor {
  name?: string;
  picture?: any;
}

export interface SanityMember {
  name: string;
  picture?: SanityMetaAltImage;
  officerPosition?: string;
  favoriteBrew?: string;
  badges?: ("bjcpCertified" | "homebrewer" | "brewEnthusiast")[];
}

export interface SanityPost {
  _id: string;
  title?: string;
  coverImage?: any;
  date?: string;
  _updatedAt?: string;
  excerpt?: string;
  author?: SanityAuthor;
  slug?: string;
  content?: any;
}

export interface SanityEvent {
  _id: string;
  _type: string;
  name?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface SanityLink {
  _id: string;
  _type: string;
  name: string;
  url: string;
}

export interface SanityResource {
  _id: string;
  _type: string;
  name?: string;
  description?: string;
  fileUrl?: string;
}

export interface SanityBrew {
  _id: string;
  _type: string;
  name?: string;
  brewer: SanityMember;
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

interface ImageRef extends SanityImageObject {
  _type: "image";
}
export interface SanityMetaAltImage {
  ref: ImageRef;
  metadata: ImageMetadata;
  alt: string;
}

export interface SanityGalleryImage {
  _id: string;
  // _type: string;
  title: string;
  event: string;
  image: SanityMetaAltImage;
  date: string;
  // sourceFolder: string;
  // sourceFileId: string;
}
