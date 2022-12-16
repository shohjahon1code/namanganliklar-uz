export const findElement = (element, parent = document) =>
  parent.querySelector(element);

export const genereteTime = (time) => {
  const year = new Date(time).getFullYear();
  const date = new Date(time).getDate();
  const month = new Date(time).getMonth() + 1;
  const minute = new Date(time).getMinutes();
  const hour = new Date(time).getHours();

  return `${hour}:${minute}/ ${date}.${month}.${year}`
};
