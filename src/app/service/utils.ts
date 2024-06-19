import { User } from "./types";

const fs = require('fs');
const allAccounts: User[] = require('./accounts.json');
console.log(allAccounts);
 
export function isAccountExist(user: User) {
  return allAccounts.some((acc) => acc.userName === user.userName);
}
 
export function checkLogin(user: User) {
  return allAccounts.some(
    (acc) => acc.userName === user.userName && acc.password === user.password
  );
}
 
export function getDataJson() {
  const jsonData = allAccounts;
  return jsonData;
}
 
export function updateDataJson(userList: User[]) {
  fs.writeFileSync('./accounts.json', JSON.stringify(userList, null, 2));
}