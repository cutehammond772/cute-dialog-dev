import { createLibraryLogs } from "@dev/dialogs/updates/utils";

export default createLibraryLogs([
  {
    version: "0.2.0",
    contents: [
      {
        title: "기능 추가",
        contents: [
          {
            title: `DialogResolver 내 모든 Context 내에서 사용할 수 있는 usePatches Hook을 추가하였습니다.`,
            contents: [
              `이제 이를 이용해 Patch를 Dependency와 유사하게 사용이 가능합니다. 
              중복된 Patch 등록은 자동으로 제외 처리됩니다.`,
            ],
          },
        ],
      },
      {
        title: "버그 수정",
        contents: [
          `한 Rendering Phase에 동일한 Patch의 요청이 복수로 들어왔을 때, 
          Storing 과정에서 하나의 요청을 제외한 다른 요청이 무시되는 문제를 수정했습니다.`,
        ],
      },
    ],
  },
  {
    version: "0.1.2",
    contents: [
      {
        title: "기능 추가",
        contents: [
          "이제 Patch Event에 별도의 Data를 같이 보낼 수 있습니다.",
          "한 Patch에서 DOM Event를 Patch Event로 매핑하는 기능이 추가되었습니다.",
        ],
      },
      {
        title: "버그 수정",
        contents: ["Patch Event를 구독할 시 인수의 타입 검사가 안 되었던 문제를 수정했습니다."],
      },
      {
        title: "기타",
        contents: [
          "Patch System 코드 개선이 있었습니다.",
          "함수의 이름을 더 직관적으로 수정했습니다.",
          "Patch System 기반으로 만들어진 별도의 Patch를 별도의 라이브러리로 분리하였습니다.",
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    contents: [
      {
        title: "기능 추가",
        contents: [
          {
            title: "Patch Event System을 추가했습니다.",
            contents: [
              "이제 Patch로부터의 요청 및 Response를 받을 수 있습니다.",
              "곧 추가될 DOM Event과의 매핑 기능을 통해, DOM Event를 가공하거나 그대로 받을 수 있게 됩니다.",
            ],
          },
        ],
      },
      {
        title: "버그 수정",
        contents: ["Patch System을 재구성하여 Patch가 초기화되는 문제를 수정했습니다."],
      },
    ],
  },
  {
    version: "0.1.0",
    contents: [
      {
        title: "기능 추가",
        contents: [
          {
            title: "Dialog의 동적 관리를 위한 Patch System을 추가했습니다.",
            contents: ["이제 Dialog의 접근 및 수정은 Patch를 만들고 추가함으로써 이루어집니다."],
          },
        ],
      },
    ],
  },
]);
