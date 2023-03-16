import { createLibraryLogs } from "@dev/dialogs/updates/utils";

export default createLibraryLogs([
  {
    version: "0.1.0",
    contents: [
      `이 라이브러리는, 앞으로 릴리즈될 다양한 Patch 라이브러리 중에서
      '동적인 효과'에 관련된 Patch를 담는 라이브러리가 될 예정입니다.`,
      {
        title: "Patch 추가: Animation",
        contents: [
          "DOM Event 중 animationstart, animationend를 매핑한 형태입니다.",
          "이를 통해 animation이 시작하거나 끝난 순간을 캐치할 수 있습니다.",
        ],
      },
      {
        title: "Patch 추가: Style",
        contents: [
          "동적으로 Dialog에 여러 개의 class를 추가하거나 제거할 수 있습니다.",
          "CSS-in-JS 라이브러리와 대부분 호환되며, 이를 통해 동적인 CSS 스타일링이 가능해집니다.",
        ],
      },
      {
        title: "Patch 추가: First",
        contents: [
          "DOM Event 중 하나인 load를 모티브로 한 Event를 가집니다.",
          {
            title: "onload를 그대로 사용하지 않는 이유는 다음과 같습니다:",
            contents: [
              `이 Patch System은 Rendering Phase를 기반으로 작동하므로 
              useEffect, useContext에 의존하고 있습니다.`,
              `따라서 load가 발생되는 시기는 Patch System이 초기화되기 전에 이루어지므로,
              이를 대신할 무언가가 필요했습니다.`,
            ],
          },
          `load 대신 이 Patch가 초기화되는 시점에서 Event를 발생시키도록 하여,
          어느정도 이를 대체할 수 있도록 했습니다.`,
        ],
      },
    ],
  },
]);
