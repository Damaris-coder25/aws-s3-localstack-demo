# Demo Amazon S3 cu LocalStack

Prototip realizat pentru referatul "Arhitecturi Cloud cu Amazon Web Services".
Proiectul demonstrează serviciul **Amazon S3** (Simple Storage Service) rulat local
cu **LocalStack**, folosind JavaScript (Node.js) și SDK-ul oficial AWS.

## Ce face demo-ul

Scriptul `demo.js` execută, în ordine, următoarele operațiuni:

1. creează un bucket (`bucket-referat`)
2. listează bucket-urile existente
3. încarcă un fișier text în bucket (inserare)
4. listează fișierele din bucket
5. citește conținutul fișierului
6. șterge fișierul
7. șterge bucket-ul

## Cerințe

- Windows, macOS sau Linux
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (pornit)
- [Node.js](https://nodejs.org/) (versiunea LTS)
- Un cont gratuit LocalStack și un **Auth Token** (https://app.localstack.cloud)

## Instalare și pornire

### 1. Clonează repository-ul

```
git clone https://github.com/Damaris-coder25/aws-s3-localstack-demo.git
cd aws-s3-localstack-demo
```

### 2. Instalează dependențele

```
npm install
```

### 3. Setează Auth Token-ul LocalStack

Token-ul se găsește în contul tău LocalStack, la secțiunea Auth Tokens.
Nu îl pune în cod și nu îl urca pe GitHub.

PowerShell (Windows):

```
$env:LOCALSTACK_AUTH_TOKEN="ls-token-ul-tau"
```

Linux / macOS:

```
export LOCALSTACK_AUTH_TOKEN="ls-token-ul-tau"
```

Variabila este valabilă doar în fereastra de terminal curentă.

### 4. Pornește LocalStack

```
docker compose up -d
```

Verifică dacă a pornit (în loguri trebuie să apară `Ready.`):
Așteaptă 10-20 de secunde, până apare `Ready.` în loguri, înainte de a rula demo-ul.

```
docker compose logs
```

Verifică serviciul S3 (trebuie să apară `"s3": "available"`):

```
curl http://localhost:4566/_localstack/health
```

## Rulare demo

```
npm start
```

Rezultat așteptat:

```
1. Bucket creat: bucket-referat
2. Bucket-uri existente: [ 'bucket-referat' ]
3. Fisier incarcat: salut.txt
4. Fisiere in bucket: [ 'salut.txt' ]
5. Continut fisier: "Salut din S3 emulat cu LocalStack!"
6. Fisier sters: salut.txt
7. Bucket sters: bucket-referat
```

## Oprire

```
docker compose down
```

## Structura proiectului

| Fișier | Rol |
|---|---|
| `docker-compose.yml` | pornește LocalStack (doar serviciul S3) |
| `demo.js` | operațiunile S3 (creare, inserare, citire, ștergere) |
| `package.json` | dependențele proiectului |

## Observații

- Conectarea la LocalStack se face prin `endpoint: "http://localhost:4566"`
  și `forcePathStyle: true`. Fără aceste setări, SDK-ul ar încerca să
  folosească AWS real.
- Credențialele `test` / `test` sunt fictive; LocalStack nu verifică parola.
- Datele nu sunt păstrate după oprirea containerului.

## Tehnologii

Node.js, `@aws-sdk/client-s3`, Docker, LocalStack