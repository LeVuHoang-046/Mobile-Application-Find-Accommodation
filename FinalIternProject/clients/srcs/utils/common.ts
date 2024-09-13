import { EStorage } from "@constants";
import { ItemPickerType } from "@types";
import {PersistedClient, Persister} from '@tanstack/react-query-persist-client';
import { storage } from "@storages";

type ClientState = PersistedClient;


export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmptyObject = (obj: object | null | undefined) => {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === '{}';
};

export const createMMKVPersister = (): Persister => {
  return {
    persistClient: async (client: ClientState) => {
      try {
        const data = JSON.stringify(client);
        storage.set(EStorage.ReactQueryCache, data);
      } catch (error) {
        console.error('Failed to persist react query cache', error);
      }
    },
    restoreClient: async (): Promise<ClientState | undefined> => {
      try {
        const data = storage.getString(EStorage.ReactQueryCache);
        if (!data) {
          return undefined;
        }
        return JSON.parse(data) as ClientState;
      } catch (error) {
        console.error('Failed to restore react query cache', error);
        return undefined;
      }
    },
    removeClient: async (): Promise<void> => {
      try {
        storage.delete(EStorage.ReactQueryCache);
      } catch (error) {
        console.error('Failed to remove react query cache', error);
      }
    },
  };
};

export const concatLabelListPicker = (list: ItemPickerType[] | undefined) => {
  if (!list || !list.length) {
    return '';
  }
  return list
    .map(item => item?.label)
    .sort()
    .join('; ');
};

/**
 * Hàm để sắp xếp mảng theo giá trị của key
 * @param array mảng T
 * @param key keyof T
 * @returns mảng sắp xếp theo key
 */
export const sortArrayByKey = <T>(array: T[], key: keyof T): T[] => {
  return array?.sort((a, b) => {
    const valueA = String(a[key]);
    const valueB = String(b[key]);
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
};

export const searchAndSortFilter = (
  array: ItemPickerType[],
  searchString: string,
): ItemPickerType[] => {
  if (!searchString) {
    return sortBetweenTitlePicker(array);
  }
  const lowerSearchTerm = searchString.toLowerCase();
  return (
    array
      ?.filter(
        item =>
          item.label.toLowerCase().includes(lowerSearchTerm) && !item?.isTitle,
      )
      ?.sort((a, b) => {
        const indexA = a.label.toLowerCase().indexOf(lowerSearchTerm);
        const indexB = b.label.toLowerCase().indexOf(lowerSearchTerm);
        return indexA - indexB;
      }) || ([] as ItemPickerType[])
  );
};

// Hàm để sắp xếp các phần tử giữa các phần tử có isHeader là true
export const sortBetweenTitlePicker = (
  items: ItemPickerType[],
): ItemPickerType[] => {
  if (!items?.length) {
    return [];
  }
  let result: ItemPickerType[] = [];
  let temp: ItemPickerType[] = [];
  let inHeaderSection = false;

  items.forEach(item => {
    if (!!item?.isTitle) {
      if (temp.length > 0) {
        temp = sortArrayByKey(temp, 'label');
        result = result.concat(temp);
        temp = [];
      }
      result.push(item);
      inHeaderSection = true;
    } else if (inHeaderSection) {
      temp.push(item);
    } else {
      result.push(item);
    }
  });

  if (temp.length > 0) {
    temp = sortArrayByKey(temp, 'label');
    result = result.concat(temp);
  }

  return result;
};
