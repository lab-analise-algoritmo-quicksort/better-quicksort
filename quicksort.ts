// import { faker } from "@faker-js/faker";

import type { IComparable, ISharable, IValuable } from "@/types";

type QuickSortResponse<EntryType> = {
  content: Array<EntryType>;
  results?: Omit<ISharable, "performanceTiming">;
};

export function quicksort<
  EntryType extends IValuable<EntryType["value"]> & IComparable<EntryType>
>(
  content: Array<EntryType>,
  shareData?: Omit<ISharable, "performanceTiming">
): QuickSortResponse<EntryType> {
  if (content.length <= 1) {
    return {
      content: [...content],
      results: shareData ?? {
        operations: 0,
        contentLength: content.length,
      },
    };
  }

  const results: Omit<ISharable, "performanceTiming"> = shareData
    ? { ...shareData, operations: (shareData.operations || 0) + 1 }
    : {
        operations: 0,
        contentLength: content.length,
      };

  const pivot: EntryType = content[Math.floor(content.length / 2)];

  const min: Array<EntryType> = content.filter((item) => {
    results.operations += 1;
    return item.compareTo(pivot) < 0;
  });

  const equal: Array<EntryType> = content.filter((item) => {
    return item.compareTo(pivot) === 0;
  });

  const max: Array<EntryType> = content.filter((item) => {
    results.operations += 1;
    return item.compareTo(pivot) > 0;
  });

  const sortedMin = quicksort(min, results);
  const sortedMax = quicksort(max, results);

  return {
    content: [...sortedMin.content, ...equal, ...sortedMax.content],
    results,
  };
}

// const initialGenerateContentTime = Date.now();

// let content: Array<string> = Array.from({ length: 100_000 }).map(() =>
//   faker.person.fullName()
// );

// const finalGenerateContentTime = Date.now();

// const initialTime = Date.now();

// quicksort<string>(content, (item1, item2) => {
//   const parsedItem1 = item1.split("").map((item) => item.charCodeAt(0));
//   const parsedItem2 = item2.split("").map((item) => item.charCodeAt(0));

//   for (let i = 0; i < Math.min(parsedItem1.length, parsedItem2.length); i++) {
//     if (parsedItem1[i] !== parsedItem2[i]) {
//       return (parsedItem1[i] - parsedItem2[i]) as 0;
//     }
//   }

//   return (parsedItem1.length - parsedItem2.length) as 0;
// });

// console.log(
//   `Time to Generate an Random Array<string>: ${
//     finalGenerateContentTime - initialGenerateContentTime
//   }ms`
// );
// console.log(`Time to execute: ${Date.now() - initialTime}ms`);
// console.log(shared.operations);
// // 61ms NODE
