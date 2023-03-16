import React, { memo } from "react";
import * as S from "@dev/components/Article.style";

export interface ArticleProps {
  title: string;
  className?: string;
}

const Article = memo(({ title, className, children }: React.PropsWithChildren<ArticleProps>) => (
  <S.Article id={title.toLowerCase()}>
    <S.Title>{title}</S.Title>
    <S.Section className={className}>{children}</S.Section>
  </S.Article>
));

export default Article;
