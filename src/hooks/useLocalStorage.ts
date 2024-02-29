type Serializer<T> = {
  deserialize: (value: string) => T;
  serialize: (value: T) => string;
};

// eslint-disable-next-line
const serializer: Record<"boolean" | "object" | "string", Serializer<any>> = {
  boolean: {
    deserialize: (value: string) => value == "true",
    serialize: (value: boolean) => String(value),
  },
  object: {
    deserialize: (value: string) => JSON.parse(value),
    serialize: (value: object) => JSON.stringify(value),
  },
  string: {
    deserialize: (value: string) => value,
    serialize: (value: string) => value,
  },
} as const;

function getType<T>(data: T) {
  return typeof data;
}

export function useLocalStorage<T extends string | object | boolean | null>(
  key: string,
  defaultValue: T,
) {
  const type = getType(defaultValue);

  function store(data: T) {
    if (!(type in serializer)) {
      throw new Error("not supported");
    }

    localStorage.setItem(key, serializer[type as keyof typeof serializer].serialize(data));
  }

  function readValue(): T {
    const data = localStorage.getItem(key);

    if (!data) {
      return defaultValue;
    }

    if (!(type in serializer)) {
      throw new Error("not supported");
    }

    return serializer[type as keyof typeof serializer].deserialize(data);
  }

  function remove() {
    localStorage.removeItem(key);
  }

  return {
    remove,
    store,
    readValue,
  };
}
