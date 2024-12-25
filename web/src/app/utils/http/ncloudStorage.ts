export async function uploadFileToNcloud(file: Blob, fileName: string): Promise<string> {
  const endpoint = process.env.NEXT_PUBLIC_NCLOUD_ENDPOINT;
  const bucketName = process.env.NEXT_PUBLIC_NCLOUD_BUCKET_NAME;
  const accessKey = process.env.NEXT_PUBLIC_NCLOUD_ACCESS_KEY;
  const secretKey = process.env.NEXT_PUBLIC_NCLOUD_SECRET_KEY;

  if (!endpoint || !bucketName || !accessKey || !secretKey) {
    throw new Error("Ncloud 환경 변수가 설정되지 않았습니다.");
  }

  const formData = new FormData();
  formData.append("file", file, fileName);

  const response = await fetch(`${endpoint}/${bucketName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessKey}:${secretKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ncloud 업로드 실패");
  }

  const data = await response.json();
  return data.location; // 업로드된 파일 URL
}
