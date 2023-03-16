import {
  ContentProps,
  isUnKeyDefaultLog,
  KeyMapped,
  KeyUnmapped,
  LibraryLogs,
} from "@dev/dialogs/updates/types";

const createKey = () => crypto.randomUUID();

const mapKeyToContents = ({ contents }: ContentProps<KeyUnmapped>): ContentProps<KeyMapped> => {
  return {
    contentKey: createKey(),
    contents: contents.map((log) =>
      isUnKeyDefaultLog(log)
        ? { key: createKey(), title: log }
        : {
            key: createKey(),
            title: log.title,
            ...mapKeyToContents({ contents: log.contents }),
          }
    ),
  };
};

export const createLibraryLogs = (logs: LibraryLogs<KeyUnmapped>): LibraryLogs<KeyMapped> =>
  logs.map(({ version, contents }) => ({
    version,
    ...mapKeyToContents({ contents }),
  }));
