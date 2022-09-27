export default {
  read(name: string): string | null {
    const cookieRegExp = new RegExp('(^|;\\s*)' + name + '=([^;]*)');
    const res = cookieRegExp.exec(document.cookie);
    return res ? decodeURIComponent(res[2]) : null;
  }
}
