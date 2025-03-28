import { faker } from "@faker-js/faker";
import { quicksort } from "./quicksort";
import { Text } from "./text";

const fakeNames = Array.from({ length: 100_000 }).map(() =>
  faker.person.firstName()
);

const content = Text.factory(...["Abner", "Alan", "Bianca", "Júlia", "Wesley"]);
// const content = Text.factory(...fakeNames);

const response = quicksort(content);

console.log(response.results);
// console.log(response.content.map((item) => item.value));
