import {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";

// Conectare la LocalStack (nu la AWS real)
const s3 = new S3Client({
  endpoint: "http://localhost:4566",
  region: "us-east-1",
  forcePathStyle: true,
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
});

const BUCKET = "bucket-referat";
const FISIER = "salut.txt";

async function main() {
  // 1. Creare bucket
  await s3.send(new CreateBucketCommand({ Bucket: BUCKET }));
  console.log(`1. Bucket creat: ${BUCKET}`);

  // 2. Listare bucket-uri
  const buckets = await s3.send(new ListBucketsCommand({}));
  console.log("2. Bucket-uri existente:", buckets.Buckets.map((b) => b.Name));

  // 3. Upload fisier (inserare)
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: FISIER,
      Body: "Salut din S3 emulat cu LocalStack!",
    })
  );
  console.log(`3. Fisier incarcat: ${FISIER}`);

  // 4. Listare fisiere din bucket
  const obiecte = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
  console.log("4. Fisiere in bucket:", obiecte.Contents.map((o) => o.Key));

  // 5. Citire fisier
  const rezultat = await s3.send(
    new GetObjectCommand({ Bucket: BUCKET, Key: FISIER })
  );
  const continut = await rezultat.Body.transformToString();
  console.log(`5. Continut fisier: "${continut}"`);

  // 6. Stergere fisier
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: FISIER }));
  console.log(`6. Fisier sters: ${FISIER}`);

  // 7. Stergere bucket (trebuie sa fie gol)
  await s3.send(new DeleteBucketCommand({ Bucket: BUCKET }));
  console.log(`7. Bucket sters: ${BUCKET}`);
}

main().catch((err) => {
  console.error("Eroare:", err.message);
});