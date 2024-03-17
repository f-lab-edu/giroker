export const isAndroid = () => {
  if (typeof window !== "undefined") {
    return /android/i.test(window.navigator.userAgent);
  }
};
