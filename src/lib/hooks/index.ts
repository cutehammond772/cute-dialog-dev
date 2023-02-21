// 외부에서 사용되는 Hooks
export { default as useDialogCreator } from "@lib/hooks/external/useDialogCreator";

export { default as useDialog } from "@lib/hooks/external/useDialog";

// 내부에서 사용되는 Hooks
export { default as useReferenceContainer } from "@lib/hooks/internal/useReferenceContainer";

// DialogProvider에서 사용되는 Hooks
export { default as useReferences } from "@lib/hooks/internal/provider/useReferences";

export { default as useElements } from "@lib/hooks/internal/provider/useElements";

export { default as useHandles } from "@lib/hooks/internal/provider/useHandles";

export { default as useProfiles } from "@lib/hooks/internal/provider/useProfiles";

// DialogResolver에서 사용되는 Hooks
export { default as useDynamicStyles } from "@lib/hooks/internal/resolver/style/useDynamicStyles";

export { default as usePatcher } from "@lib/hooks/internal/resolver/usePatcher";