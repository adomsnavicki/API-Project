export function firstLetterUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export function getParams(param) {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const value = urlParams.get(param);

  return value;
}
