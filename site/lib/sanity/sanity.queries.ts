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

export const aboutQuery = groq`
*[_type == "about"] {
  body,
}`;

export const meetingMinutesQuery = groq`
*[_type == "meetingMinutes"] | order(meetingDate desc, _updatedAt desc) {
  ...,
  attendees[]->
}`;

export const membersQuery = groq`
*[_type == "member"] {
  name,
  picture,
  officerPosition,
  favoriteBrew,
  badges,
}
`;

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
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

// End Queries
