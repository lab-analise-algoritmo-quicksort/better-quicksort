import { faker } from "@faker-js/faker";

type CompareToMethod<ContentType> = (
  item1: ContentType,
  item2: ContentType
) => -1 | 0 | 1;

const shared = {
  operations: 0,
};

export function betterQuicksort<ContentType>(
  data: Array<ContentType>,
  compareTo: CompareToMethod<ContentType>,
  sharedData: typeof shared = shared
): Array<ContentType> {
  if (data.length < 2) {
    return data;
  }

  sharedData.operations += 1;

  const pivot: ContentType = data[Math.floor(data.length / 2)];

  const min: Array<ContentType> = data.filter(
    (item) => compareTo(item, pivot) < 0
  );
  const equal: Array<ContentType> = data.filter(
    (item) => compareTo(item, pivot) === 0
  );
  const max: Array<ContentType> = data.filter(
    (item) => compareTo(item, pivot) > 0
  );

  return [
    ...betterQuicksort(min, compareTo),
    ...equal,
    ...betterQuicksort(max, compareTo),
  ];
}

const initialGenerateContentTime = Date.now();

let content: Array<string> = Array.from({ length: 100_000 }).map(() =>
  faker.person.fullName()
);

const finalGenerateContentTime = Date.now();

const initialTime = Date.now();

betterQuicksort<string>(content, (item1, item2) => {
  const parsedItem1 = item1.split("").map((item) => item.charCodeAt(0));
  const parsedItem2 = item2.split("").map((item) => item.charCodeAt(0));

  for (let i = 0; i < Math.min(parsedItem1.length, parsedItem2.length); i++) {
    if (parsedItem1[i] !== parsedItem2[i]) {
      return (parsedItem1[i] - parsedItem2[i]) as 0;
    }
  }

  return (parsedItem1.length - parsedItem2.length) as 0;
});

console.log(
  `Time to Generate an Random Array<string>: ${
    finalGenerateContentTime - initialGenerateContentTime
  }ms`
);
console.log(`Time to execute: ${Date.now() - initialTime}ms`);
console.log(shared.operations);
// 61ms NODE