import React, { memo } from "react";
import * as I from "@dev/info";
import * as S from "@dev/components/App.style";

import Header from "@dev/components/Header";
import Footer from "@dev/components/Footer";

import Introduction from "@dev/components/articles/Introduction";

const App = memo(() => (
  <S.App>
    <Header items={I.ARTICLES} />
    <S.Main>
      <Introduction />
    </S.Main>
    <Footer />
  </S.App>
));

export default App;
