import { memo } from "react";
import * as S from "$/Article.style";

interface ArticleProps {
  title: string;
}

const Article = memo(({ title, children }: React.PropsWithChildren<ArticleProps>) => (
  <S.Article id={title.toLowerCase()}>
    <S.Title>{title}</S.Title>
    <S.Section>{children}</S.Section>
  </S.Article>
));

export default Article;
