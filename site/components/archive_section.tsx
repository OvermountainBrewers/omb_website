import Link from "next/link";
import { H2, P } from "./typography";

export function ArchiveSection({
  url,
  archiveType,
}: {
  url: string;
  archiveType: string;
}): React.ReactNode {
  return (
    <>
      <H2>Archive</H2>
      <P>
        We have a lot of {archiveType} from the past. We have moved them to a
        Google Sheets archive page.
      </P>
      <Link
        className="underline"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View the archive
      </Link>
    </>
  );
}
