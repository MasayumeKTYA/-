import { createDirImage, writeFileImage } from "./index";
export default class Mp3File {
  path: string;
  retriever: PlusAndroidInstanceObject;
  prePath: string;
  constructor(path: string, prePath: string) {
    this.path = path;
    console.log(path);

    this.prePath = prePath;
    this.retriever = plus.android.newObject(
      "android.media.MediaMetadataRetriever"
    );
    plus.android.invoke(this.retriever, "setDataSource", path);
  }
  getAuther(): string {
    return plus.android.invoke(
      this.retriever,
      "extractMetadata",
      this.retriever.plusGetAttribute("METADATA_KEY_ALBUMARTIST")
    );
  }
  getDuring(): number {
    return plus.android.invoke(
      this.retriever,
      "extractMetadata",
      this.retriever.plusGetAttribute("METADATA_KEY_DURATION")
    );
  }
  getType(): string {
    return plus.android.invoke(
      this.retriever,
      "extractMetadata",
      this.retriever.plusGetAttribute("METADATA_KEY_MIMETYPE")
    );
  }
  getName(): string {
    return plus.android.invoke(
      this.retriever,
      "extractMetadata",
      this.retriever.plusGetAttribute("METADATA_KEY_TITLE")
    );
  }
  getAlbum(): string {
    return plus.android.invoke(
      this.retriever,
      "extractMetadata",
      this.retriever.plusGetAttribute("METADATA_KEY_ALBUM")
    );
  }
  getImage(): string {
    const arrByte: number[] = plus.android.invoke(
      this.retriever,
      "getEmbeddedPicture"
    );
    //逻辑判断 为null没有歌曲封面 添加异常饭 字符串0
    console.log(arrByte);
    if (arrByte !== null) {
      try {
        const res = writeFileImage(this.prePath, arrByte);
        return res;
      } catch (e) {
        uni.showToast({
          title: "添加失败",
          icon: "error",
          mask: true,
        });
        return "0";
      }
    } else {
      return "";
    }
  }
}
