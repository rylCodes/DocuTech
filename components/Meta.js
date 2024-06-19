import Head from "next/head";
import React from "react";

export default function Meta({
  title = "DocuTech",
  subTitle = null,
  name,
  content,
}) {
  return (
    <Head>
      <title>{subTitle ? `${title} | ${subTitle}` : title}</title>
      <meta name={name} content={content} />
    </Head>
  );
}
