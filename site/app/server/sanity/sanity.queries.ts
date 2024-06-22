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
export const settingsQuery = groq`*[_type == "settings"][0]`;

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${_postFields}
}`;

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${_postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${_postFields}
  }
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${_postFields}
}
`;

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

export interface Settings {
  title?: string;
  description?: any[];
  ogImage?: {
    title?: string;
  };
}
// End Types
