import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { groq } from "next-sanity";

// Fields
const _postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`;

// End Fields

// Queries

export const membersQuery = groq`
*[_type == "member"] {
  name,
  picture,
}
`;

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${_postFields}
}`;

// create queries for events, and resources

export const eventsQuery = groq`
*[_type == "event"] | order(date desc, _updatedAt desc) {
  name,
  date,
  location,
  description,
}`;

export const resourcesQuery = groq`
*[_type == "resource"] {
  name,
  description,
  "fileUrl": file.asset->url,
}`;

// End Queries

// Types
export interface Author {
  name?: string;
  picture?: any;
}

export interface Member {
  name?: string;
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
  name?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface Resource {
  _id: string;
  name?: string;
  description?: string;
  fileUrl?: string;
}
// End Types
