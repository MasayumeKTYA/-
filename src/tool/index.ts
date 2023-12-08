
/**
 * 
 * @param strPath 目前音频文件根目录
 * @returns base地址
 */
export function getBase64Path(strPath: string): string {
  const retriever = plus.android.newObject("android.media.MediaMetadataRetriever");
  plus.android.invoke(retriever, "setDataSource", strPath + '/bg1.mp3');
  const arrByte: number[] = plus.android.invoke(retriever, 'getEmbeddedPicture')
  createDir(strPath)
  console.log(strPath);
  writeFile(strPath, arrByte)
  // const Base64 = plus.android.invoke('java.util.Base64', 'getEncoder')
  // const str: string = plus.android.invoke(Base64, 'encodeToString', arrByte)
  // plus.android.autoCollection(retriever)
  // return str;
  return ''
}
function createDir(str: string) {
  const File = plus.android.newObject('java.io.File', str + '/image')
  const flag: boolean = plus.android.invoke(File, 'exists')
  if (!flag) {
    const isCreateSuccessful = plus.android.invoke(File, 'mkdir')
    if (isCreateSuccessful) {
      console.log('file create successfully');
    } else {
      console.log('failed to create');
    }
  } else {
    console.log('file already exists');
  }
}
function writeFile(path: string, byteImage: number[]) {
  console.log(path);

  const fileName = generateString()
  const File = plus.android.newObject('java.io.File', path + '/image' + fileName)
  const fos = plus.android.newObject('java.io.FileOutputStream', File)
  plus.android.invoke(fos, 'write', byteImage)
  plus.android.invoke(fos, 'close')
  plus.android.autoCollection(fos)
}
function generateString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const hours = ("0" + currentDate.getHours()).slice(-2);
  const minutes = ("0" + currentDate.getMinutes()).slice(-2);
  const randomNum = Math.floor(Math.random() * 10000); // 生成一个随机数，范围在 0 到 999 之间
  const formattedString = year + month + day + hours + minutes + randomNum;
  return '/' + formattedString + '.jpeg';
}

//首次进入创建文件夹
export function firstCreateRootFile(path: string) {

  const File = plus.android.newObject('java.io.File', path + '/myMusicApp')
  const flag: boolean = plus.android.invoke(File, 'exists')
  if (!flag) {
    const isCreateSuccessful = plus.android.invoke(File, 'mkdir')
    if (isCreateSuccessful) {
      console.log('file create successfully');
    } else {
      console.log('failed to create');
    }
  } else {
    console.log('file already exists');
  }
}

//中英文排序
export function CnEnSort(arr:JavaFilePath[]) {
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

  arr.sort((a, b) => {
    return collator.compare(a.name, b.name);
  });
}