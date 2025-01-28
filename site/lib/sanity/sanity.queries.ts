import { groq } from "next-sanity";

function groqMetaAltImage(key: string) {
  return groq`"${key}": {
    "ref": ${key},
    "metadata": ${key}.asset->metadata,
    "alt": ${key}.alt
  }`;
}

// Fields
const _postFields = groq`
  ...,
  ${groqMetaAltImage("coverImage")},
  "slug": slug.current,
  "author": author->{name, ${groqMetaAltImage("picture")},},
`;

const _meetingMinutesFields = groq`
  ...,
  "slug": slug.current,
  "author": author->{name, ${groqMetaAltImage("picture")},}
`;

// End Fields

// Queries

export const aboutQuery = groq`
*[_type == "about"] {
  body,
}`;

export const meetingMinutesQuery = groq`
*[_type == "meetingMinutes"] | order(meetingDate desc, _updatedAt desc) {
  ${_meetingMinutesFields},
}`;

export const meetingMinutesBySlugQuery = groq`
*[_type == "meetingMinutes" && slug.current == $slug][0] {
  ${_meetingMinutesFields}
}`;

export const meetingMinutesSlugsQuery = groq`
*[_type == "meetingMinutes"]{"slug": slug.current}`;

export const membersQuery = groq`
*[_type == "member"] {
  name,
  ${groqMetaAltImage("picture")},
  officerPosition,
  favoriteBrew,
  badges,
}`;

export interface SlugType {
  slug: string;
}

export const postSlugsQuery = groq`
*[_type == "post"]{"slug": slug.current}`;

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${_postFields}
}`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${_postFields}
}`;

// create queries for events, and resources

export const eventsQuery = groq`
*[_type == "event"] | order(date desc, _updatedAt desc) {...}`;

const resourcesQuery = groq`
*[_type == "resource"] {
  name,
  description,
  "fileUrl": file.asset->url,
}`;

const linksQuery = groq`
*[_type == "link"] {
  name,
  url,
}`;

export const allResourcesQuery = `
{
  "links": ${linksQuery},
  "resources": ${resourcesQuery},
}
`;

export const brewsQuery = groq`
*[_type == "brew"] | order(brewDates.endDate desc, _updatedAt desc) {
    ...,
    "brewer": brewer->,
  }`;

export const activitiesQuery = `
{
  "events": ${eventsQuery},
  "brews": ${brewsQuery},
}
`;

export const galleryImagesQuery = groq`
*[_type == "galleryImage"] | order(date asc, title asc) {
  _id,
  date,
  ${groqMetaAltImage("image")},
  event,
  title
}`;

// End Queries
