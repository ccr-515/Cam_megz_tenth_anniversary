const IMAGE_EXTENSION_VARIANTS = [".jpg", ".JPG", ".jpeg", ".JPEG"];

export function toAssetUrl(pathname) {
  if (!pathname) {
    return "";
  }

  if (/^(https?:)?\/\//.test(pathname)) {
    return pathname;
  }

  const cleanPath = pathname.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function toImageCandidateUrls(pathname) {
  if (!pathname) {
    return [];
  }

  if (/^(https?:)?\/\//.test(pathname)) {
    return [pathname];
  }

  const cleanPath = pathname.replace(/^\/+/, "");
  const extensionMatch = cleanPath.match(/(\.[^.]+)$/);
  const extension = extensionMatch?.[1] ?? "";
  const basePath = extension ? cleanPath.slice(0, -extension.length) : cleanPath;
  const shouldTryVariants =
    !extension || IMAGE_EXTENSION_VARIANTS.some((variant) => variant.toLowerCase() === extension.toLowerCase());

  const candidates = shouldTryVariants
    ? [cleanPath, ...IMAGE_EXTENSION_VARIANTS.map((variant) => `${basePath}${variant}`)]
    : [cleanPath];

  return [...new Set(candidates)].map((candidate) => toAssetUrl(candidate));
}
