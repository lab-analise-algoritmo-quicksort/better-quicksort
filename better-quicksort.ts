type CompareToMethod<ContentType> = (
  item1: ContentType,
  item2: ContentType
) => -1 | 0 | 1;

export function betterQuicksort<ContentType>(
  data: Array<ContentType>,
  compareTo: CompareToMethod<ContentType>
): Array<ContentType> {
  if (data.length < 2) {
    return data;
  }

  const pivot: ContentType = data[Math.floor(data.length / 2)];

  const min: Array<ContentType> = data.filter((item) => compareTo(item, pivot) < 0);
  const equal: Array<ContentType> = data.filter((item) => compareTo(item, pivot) === 0);
  const max: Array<ContentType> = data.filter((item) => compareTo(item, pivot) > 0);

  return [...betterQuicksort(min, compareTo), ...equal, ...betterQuicksort(max, compareTo)];
}

let content: Array<string> = ["José", "Alan", "Lucas", "Albérico", "João", "Pedro", "Abner", "Júlia"];

console.log(betterQuicksort<string>(content, (item1, item2) => {
  const parsedItem1 = item1.split("").map(item => item.charCodeAt(0));
  const parsedItem2 = item2.split("").map(item => item.charCodeAt(0));

  for (let i = 0; i < Math.min(parsedItem1.length, parsedItem2.length); i++) {
    if (parsedItem1[i] !== parsedItem2[i]) {
      return parsedItem1[i] - parsedItem2[i] as 0;
    }
  }

  return parsedItem1.length - parsedItem2.length as 0;
}));

