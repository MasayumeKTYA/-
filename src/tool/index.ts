/**
 *
 * @param strPath 目前音频文件根目录
 * @returns base地址
 */
export function getBase64Path(strPath: string): string {
  const retriever = plus.android.newObject(
    "android.media.MediaMetadataRetriever"
  );
  plus.android.invoke(retriever, "setDataSource", strPath + "/bg1.mp3");
  const arrByte: number[] = plus.android.invoke(
    retriever,
    "getEmbeddedPicture"
  );
  createDirImage(strPath);
  console.log(strPath);
  writeFileImage(strPath, arrByte);
  // const Base64 = plus.android.invoke('java.util.Base64', 'getEncoder')
  // const str: string = plus.android.invoke(Base64, 'encodeToString', arrByte)
  // plus.android.autoCollection(retriever)
  // return str;
  return "";
}
//创建图片文件夹存放解析图片
export function createDirImage(str: string) {
  const path = str + "/image";
  console.log(path);

  const File = plus.android.newObject("java.io.File", path);
  const flag: boolean = plus.android.invoke(File, "exists");

  if (!flag) {
    const isCreateSuccessful = plus.android.invoke(File, "mkdir");
    console.log(isCreateSuccessful);

    if (isCreateSuccessful) {
      console.log("file create successfully");
    } else {
      console.log("failed to create");
      throw new Error("文件夹创建失败");
    }
  } else {
    console.log("file already exists");
  }
}
//创建json 保存文件信息
function createDirJSON(path: string) {
  const File = plus.android.newObject("java.io.File", path + "/JSON");
  const flag: boolean = plus.android.invoke(File, "exists");
  if (!flag) {
    const isCreateSuccessful = plus.android.invoke(File, "createNewFile");
    if (isCreateSuccessful) {
      console.log("file create successfully");
    } else {
      console.log("failed to create");
    }
  } else {
    console.log("file already exists");
  }
}
//写入图片
export function writeFileImage(path: string, byteImage: number[]): string {
  console.log(path);

  const fileName = generateString();
  const lastPath = path + "/image" + fileName;
  const File = plus.android.newObject("java.io.File", lastPath);
  const fos = plus.android.newObject("java.io.FileOutputStream", File);
  plus.android.invoke(fos, "write", byteImage);
  plus.android.invoke(fos, "close");
  plus.android.autoCollection(fos);
  return lastPath;
}
//写入json信息
function writeJSON(path: string, json: string) {
  console.log(path);

  const fileName = "JSON.json";
  const File = plus.android.newObject("java.io.File", path + fileName);
  const fos = plus.android.newObject("java.io.FileOutputStream", File);
  const byteJson = plus.android.invoke(json, "getBytes");
  plus.android.invoke(fos, "write", byteJson);
  plus.android.invoke(fos, "close");
  plus.android.autoCollection(fos);
}
//自定义图片名称
function generateString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const hours = ("0" + currentDate.getHours()).slice(-2);
  const minutes = ("0" + currentDate.getMinutes()).slice(-2);
  const randomNum = Math.floor(Math.random() * 10000); // 生成一个随机数，范围在 0 到 999 之间
  const formattedString = year + month + day + hours + minutes + randomNum;
  return "/" + formattedString + ".jpeg";
}
