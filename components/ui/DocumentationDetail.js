import React, { Fragment } from "react";
import CodeSnippet from "./CodeSnippet";
import { formatToLongDate } from "../../utils/date";

export default function DocumentationDetail({ documentation }) {
  const today = new Date();

  return (
    <Fragment>
      <div className="container max-w-[104rem]">
        <div className="flex flex-col items-start gap-2 w-full lg:flex-row lg:justify-between lg:items-center">
          <h3
            className="text-5xl font-bold scroll-mt-24"
            id={documentation.title?.split(" ").join("-").toLowerCase()}
          >
            {documentation.title}
          </h3>
          <div className="flex flex-col gap-1">
            <small className="whitespace-nowrap">
              Author: {documentation.author}
            </small>
            <small>
              Last update:{" "}
              {documentation.updated_at
                ? formatToLongDate(documentation.updated_at)
                : formatToLongDate(today)}
            </small>
          </div>
        </div>
        <p className="mt-4 text-lg">{documentation.description}</p>
        {documentation.content?.map((item, index) => {
          if (item.type === "Header") {
            return (
              <h4
                key={index}
                className="text-4xl mt-8 scroll-mt-24"
                id={item && item.text?.split(" ").join("-").toLowerCase()}
              >
                {item.text}
              </h4>
            );
          } else if (item.type === "Paragraph") {
            return (
              <p key={index} className="mt-4">
                {item.text}
              </p>
            );
          } else if (item.type === "Code Block") {
            return (
              <div className="p-4 max-w-[72rem]" key={index}>
                <CodeSnippet language={item.language}>{item.code}</CodeSnippet>
              </div>
            );
          } else if (item.type === "List") {
            return (
              <ol
                key={index}
                className={`flex flex-col gap-2 w-full mt-4 ${
                  item.listType === "bulleted"
                    ? "list-disc list-inside"
                    : item.listType === "numbered"
                    ? "list-decimal list-inside"
                    : "list-none"
                }`}
              >
                {item.items?.map((listItem, index) => (
                  <li key={index}>{listItem}</li>
                ))}
              </ol>
            );
          } else if (item.type === "Link") {
            return (
              <a key={index} href={item.url} className="inline-block mt-4">
                {item.text}
              </a>
            );
          } else if (item.type === "Image") {
            return (
              <div
                key={index}
                className="mt-12 mb-6 w-full h-auto aspect-video"
              >
                <img
                  className="w-full h-auto aspect-video rounded-xl"
                  src={item.url}
                  alt={item.caption || "Image"}
                />
                {item.caption && (
                  <p className="italic text-sm text-center mt-2">
                    {item.caption}
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </Fragment>
  );
}
