import { createLibraryLogs } from "@dev/dialogs/updates/utils";

export default createLibraryLogs([
  {
    version: "0.1.0",
    contents: [
      "이 라이브러리에서는, 기존 Dialog를 기반으로 Modal를 구현하였습니다.",
      "유명한 UI 라이브러리의 Modal과 달리, 기존 UI 로직에 함께 표현된 형태가 아닙니다.",
      "독립적인 컨테이너를 두고 작동합니다.",
      "기존 컴포넌트를 만드는 것과 똑같이 만들 수 있으며, 심지어 기존에 만든 컴포넌트를 이식하는 것도 가능합니다.",
      "기존 Dialog와 혼용이 가능하며, 똑같이 addDialog 메소드로 추가하면 됩니다.",
    ],
  },
]);
