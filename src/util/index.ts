// 获取唯一标识符
export const generateUUID = () => {
  let d = Date.now();

  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); 
  }

  let temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

  var uuid = temp.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  return uuid;
}