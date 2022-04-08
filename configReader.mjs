import fs from 'fs';

export function configReader(file){
  const fileContent = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return fileContent.user;
}