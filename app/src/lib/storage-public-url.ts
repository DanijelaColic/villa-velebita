/** Client-safe public URL builder (bez createServiceClient). */
export function buildPublicStorageUrl(
  bucket: string,
  storagePath: string,
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return '';
  // encodeURI zadržava slash u folder pathovima (opt/...).
  const encoded = storagePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${baseUrl}/storage/v1/object/public/${bucket}/${encoded}`;
}
