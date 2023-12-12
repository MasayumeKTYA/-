export default class File {
  path: string;
  constructor(path: string) {
    this.path = path;
  }
  createDir(fileName: string) {
    const path = this.path + fileName;
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
  //自定义文件名写入
  writeData(byteImage: number[], type: string, address: string) {
    const fileName = this.getFilename(type);
    const lastPath = address + fileName;
    const File = plus.android.newObject("java.io.File", lastPath);
    const fos = plus.android.newObject("java.io.FileOutputStream", File);
    plus.android.invoke(fos, "write", byteImage);
    plus.android.invoke(fos, "close");
    plus.android.autoCollection(fos);
    return lastPath;
  }
  //指定文件名写入'
  writeDataFimeName(byteImage: number[], address: string) {
    const lastPath = address;
    const File = plus.android.newObject("java.io.File", lastPath);
    const fos = plus.android.newObject("java.io.FileOutputStream", File);
    plus.android.invoke(fos, "write", byteImage);
    plus.android.invoke(fos, "close");
    plus.android.autoCollection(fos);
    return lastPath;
  }
  getFilename(fileType: string): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const hours = ("0" + currentDate.getHours()).slice(-2);
    const minutes = ("0" + currentDate.getMinutes()).slice(-2);
    const randomNum = Math.floor(Math.random() * 10000); // 生成一个随机数，
    const formattedString = year + month + day + hours + minutes + randomNum;
    return "/" + formattedString + fileType;
  }
  readFile(path: string): string {
    const StringBuilder = plus.android.newObject("java.lang.StringBuilder");
    try {
      const localFile = plus.android.newObject("java.io.File", path);
      const FileReader = plus.android.newObject(
        "java.io.FileReader",
        localFile
      );
      const BufferedReader = plus.android.newObject(
        "java.io.BufferedReader",
        FileReader
      );
      let line = "";
      while (
        (line = plus.android.invoke(BufferedReader, "readLine")) !== null
      ) {
        plus.android.invoke(StringBuilder, "append", line);
        plus.android.invoke("java.lang.System", "lineSeparator");
      }
      return plus.android.invoke(StringBuilder, "toString");
    } catch (e) {
      console.warn(e);
      throw new Error("读文件出错");
    }
  }
}
