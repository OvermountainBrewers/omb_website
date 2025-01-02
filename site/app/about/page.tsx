import { Metadata } from "next";
import { getAbout as getContent } from "@/lib/sanity/sanity.endpoints";
import StyledText from "@/components/styled_text";
import Main from "@/components/main";
import { StyledArticle } from "@/components/styled_article";

export const metadata: Metadata = {
  title: {
    absolute: "About | Overmountain Brewers",
  },
  description: "About Overmountain Brewers",
};

export default async function Page() {
  const content = await getContent();

  return (
    <Main>
      <StyledArticle id="about">
        <h1>About</h1>
        {StyledText({ value: content.body })}
      </StyledArticle>
    </Main>
  );
}
