import { notFound } from "next/navigation";
import StyledText from "@/components/styled_text";
import {
  getMeetingMinutesBySlug,
  getMeetingMinutesSlugs,
} from "@/lib/sanity/sanity.endpoints";
import { StyledArticle } from "@/components/styled_article";
import Main from "@/components/main";

interface MeetingMinutesPageProps {
  params: {
    slug: string;
  };
}

/// This is the entrypoint for the dynamic route of [slug]
/// NextJS provides the params object, which contains the slug
export default async function MeetingMinutesPage({
  params,
}: MeetingMinutesPageProps) {
  // Handle common user URL mistakes
  const sanitizedSlug = params.slug
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");

  const meetingMinutes = await getMeetingMinutesBySlug(sanitizedSlug);

  if (!meetingMinutes) {
    notFound();
  }

  const { sharedTastings, meetingNotes, title, author, meetingDate } =
    meetingMinutes;

  return (
    <Main>
      <StyledArticle>
        <header className="mb-8 space-y-4">
          <h1 className="m-0">{title}</h1>
          <div className="flex items-center gap-x-4 text-sm not-prose text-muted-foreground">
            {author?.name && <span>By {author.name}</span>}
            {meetingDate && (
              <>
                <span>•</span>
                <time dateTime={meetingDate}>
                  {"Meeting notes for "}
                  {new Date(meetingDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>{" "}
              </>
            )}
          </div>
        </header>

        {sharedTastings &&
          StyledText({
            value: sharedTastings,
          })}

        {meetingNotes &&
          StyledText({
            value: meetingNotes,
          })}
      </StyledArticle>
    </Main>
  );
}

// The function should return an array of objects, where each object has a `slug` property.
export const generateStaticParams = getMeetingMinutesSlugs;
