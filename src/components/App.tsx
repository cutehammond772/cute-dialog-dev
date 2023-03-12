import { memo } from "react";

import * as S from "$/App.style";

import Header from "$/Header";
import Footer from "$/Footer";

import * as I from "$/info";
import Introduction from "./articles/Introduction";

const App = memo(() => (
  <S.App>
    <Header version={I.VERSION} items={I.ARTICLES} />
    <S.Main>
      <Introduction />
    </S.Main>
    <Footer version={I.VERSION} />
  </S.App>
));

export default App;
