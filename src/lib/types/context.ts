import { Dialog, DialogID, DialogTemplate } from "@lib/types/essential";

// DialogProvider 내부 컴포넌트에서 사용할 수 있는 Context입니다.
export interface IDialogContext {
  // DialogTemplate를 통해 새로운 Dialog를 생성합니다.
  _addDialog: (dialog: DialogTemplate) => DialogID;

  // Dialog를 삭제합니다.
  _removeDialog: (id: DialogID) => void;

  // 특정 Dialog의 Ref를 가져옵니다.
  _getHandle: (id: DialogID) => HTMLDivElement | undefined;
}

export interface IDialogContainer {
  [id: DialogID]: Dialog;
}
