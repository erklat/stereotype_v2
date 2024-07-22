# STEREOTYPE_V2

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Descriptive part of request and choices here:

[Stereotype_v2](https://docs.google.com/document/d/1qDtCBVSbb0qhRCRZMMCG9DriZsY9F0FttXhoGD6imT8/edit?usp=sharing)

First, install dependencies:

```bash
npm install
```

Then, start the mariadb database server:

```bash
docker-compose up -d
```

Now, run migrations and seed the database:

```bash
npx prisma migrate dev
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
