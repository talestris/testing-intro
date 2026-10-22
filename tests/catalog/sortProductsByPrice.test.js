const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, "asc");
    const resultIds = result.map((product) => product.id);
    expect(resultIds).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products);
    const resultIds = result.map((product) => product.id);
    expect(resultIds).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const filtered = products.filter(({ id }) => [1, 3, 4].includes(id));
    const result = sortProductsByPrice(filtered, "asc");
    const resultIds = result.map((p) => p.id);
    expect(resultIds).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, "desc");
    const resultIds = result.map((product) => product.id);
    expect(resultIds).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const filtered = products.filter(({ id }) => [3, 1, 4].includes(id));
    const result = sortProductsByPrice(filtered, "desc");
    const resultIds = result.map((p) => p.id);
    expect(resultIds).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const filtered = products.filter(({ id }) => [5, 2, 6].includes(id));
    const result = sortProductsByPrice(filtered, "desc");
    const resultIds = result.map((p) => p.id);
    expect(resultIds).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const filtered = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalIds = filtered.map((p) => p.id);
    sortProductsByPrice(filtered, "asc");
    const postSortIds = filtered.map((p) => p.id);
    expect(postSortIds).toEqual(originalIds);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const filtered = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalIds = filtered.map((p) => p.id);
    sortProductsByPrice(filtered, "desc");
    const postSortIds = filtered.map((p) => p.id);
    expect(postSortIds).toEqual(originalIds);
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const originalIds = products.map((p) => p.id);
    sortProductsByPrice(products);
    const postSortIds = products.map((p) => p.id);
    expect(postSortIds).toEqual(originalIds);
  });
});
