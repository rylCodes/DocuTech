import React, { Fragment, useEffect, useRef, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { FaAngleDown } from "react-icons/fa6";
import { languages } from "../../data/programmingLanguages";

export default function FormContent(props) {
  // Header Input Handler
  function onHeaderInputChange(e) {
    props.setHeaderInput(e.target.value);
  }

  function addNewHeader() {
    if (props.headerInput.trim() === "") {
      return;
    }

    const headerObj = {
      type: "Header",
      text: props.headerInput,
    };
    props.addToContent(headerObj);
    props.setHeaderInput("");
    props.headerRef.current.focus();
  }

  // Paragraph Input Handler
  function onParagraphInputChange(e) {
    props.setParagraphInput(e.target.value);
  }

  function addNewParagraph() {
    if (props.paragraphInput.trim() === "") {
      return;
    }

    const paragraphObj = {
      type: "Paragraph",
      text: props.paragraphInput,
    };
    props.addToContent(paragraphObj);
    props.setParagraphInput("");
  }

  // Code Block Input Handler
  function handleSelectLanguage(event, language) {
    props.onSelectLanguage(event, language);
    props.setCodeBlockInput(
      (prevValue) => (prevValue = languages[language].value)
    );
  }

  function onCodeBlockInputChange(value, event) {
    props.setCodeBlockInput(value);
  }

  function addNewCodeBlock() {
    if (props.codeBlockInput.trim() === "") {
      return;
    }

    const codeBlockObj = {
      type: "Code Block",
      language: props.selectedLanguage,
      code: props.codeBlockInput,
    };
    props.addToContent(codeBlockObj);
    handleSelectLanguage(null, props.selectedLanguage);
  }

  // List Input Handler
  const handleInputChange = (event, index) => {
    const newList = [...props.listItems];
    newList[index] = event.target.value;
    props.setListItems((prevList) => (prevList = newList));
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < props.itemCount; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          value={props.listItems[i] || ""}
          onChange={(event) => handleInputChange(event, i)}
          className="px-4 py-2 focus:outline-none"
        />
      );
    }
    return inputs;
  };

  // const [originalItemCount, setOriginalItemCount] = useState(props.itemCount);
  const listInputs = useRef(null);

  function onItemCountChange(e) {
    props.setItemCount(Number(e.target.value));
  }

  const handleListTypeChange = (event) => {
    props.setSelectedListType(event.target.value);
  };

  function addNewList() {
    if (props.listItems[0]?.trim() === "" || props.listItems.length === 0) {
      return;
    }

    const listObj = {
      type: "List",
      listType: props.selectedListType,
      items: props.listItems,
    };
    props.addToContent(listObj);
    props.setListItems([]);
  }

  // Image Input Handler
  function onImageSrcInputChange(e) {
    props.setImageSrcInput(e.target.value);
  }

  function onImageCaptionInputChange(e) {
    props.setImageCaptionInput(e.target.value);
  }

  function addNewImage() {
    if (props.imageSrcInput.trim() === "") {
      return;
    }

    const imageObj = {
      type: "Image",
      url: props.imageSrcInput,
      caption: props.imageCaptionInput,
    };
    props.addToContent(imageObj);
    props.setImageCaptionInput("");
    props.setImageSrcInput("");
  }

  // Link Input Handler
  function onLinkTextInputChange(e) {
    props.setLinkTextInput(e.target.value);
  }

  function onLinkUrlInputChange(e) {
    props.setLinkUrlInput(e.target.value);
  }

  function addNewLink() {
    if (props.linkTextInput.trim() === "") {
      return;
    }

    const linkObj = {
      type: "Link",
      text: props.linkTextInput,
      url: props.linkUrlInput,
    };
    props.addToContent(linkObj);
    props.setLinkTextInput("");
    props.setLinkUrlInput("");
  }

  // Content Form Handler
  function onSaveItemContent() {
    if (props.updatingContentItem) {
      // Update content item
      props.onUpdateItemContent();
    } else {
      //  Add content item
      if (props.selectedType === "Header") {
        addNewHeader();
      } else if (props.selectedType === "Paragraph") {
        addNewParagraph();
      } else if (props.selectedType === "Code Block") {
        addNewCodeBlock();
      } else if (props.selectedType === "List") {
        addNewList();
      } else if (props.selectedType === "Image") {
        addNewImage();
      } else if (props.selectedType === "Link") {
        addNewLink();
      } else {
        return;
      }
    }

    props.setUpdatingContentItem(false);
  }

  let contentInputForm;
  if (props.selectedType === "Header") {
    contentInputForm = (
      <input
        ref={props.headerRef}
        className="px-4 py-2 focus:outline-none"
        type="text"
        id="header"
        name="header"
        value={props.headerInput}
        placeholder="Enter new header..."
        onChange={onHeaderInputChange}
        autoFocus
      />
    );
  } else if (props.selectedType === "Paragraph") {
    contentInputForm = (
      <textarea
        ref={props.paragraphRef}
        className="px-4 py-2 focus:outline-none"
        id="paragraph"
        name="paragraph"
        value={props.paragraphInput}
        placeholder="Enter new header..."
        onChange={onParagraphInputChange}
        rows={5}
        autoFocus
      ></textarea>
    );
  } else if (props.selectedType === "Code Block") {
    contentInputForm = (
      <div>
        <div key={"languageOptions"} className="flex items-center gap-2">
          <span>Language:</span>{" "}
          <div className="flex flex-col w-full max-w-72">
            <button
              className="flex items-center justify-between w-full bg-gray-50 px-4 py-2"
              type="button"
              onClick={props.toggleLanguageOptions}
            >
              <span>{props.selectedLanguage}</span> <FaAngleDown />
            </button>
            <div className="relative">
              <ul
                className={`absolute top-0 left-0 z-10 w-72 overflow-hidden bg-white transition-all duration-300 rounded-md shadow-lg mt-1 ${
                  props.isLanguageOptionsOpen ? "h-fit" : "h-0"
                }`}
              >
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "javascript"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "javascript")}
                >
                  javascript
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "php"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "php")}
                >
                  php
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "html"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "html")}
                >
                  html
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "python"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "python")}
                >
                  python
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "css"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "css")}
                >
                  css
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "java"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "java")}
                >
                  java
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "csharp"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "csharp")}
                >
                  csharp
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "cpp"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "cpp")}
                >
                  cpp
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "ruby"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "ruby")}
                >
                  ruby
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "go"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "go")}
                >
                  go
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-between p-3 transition-colors duration-300 ${
                    props.selectedLanguage === "rust"
                      ? "bg-teal-200 hover:bg-teal-200"
                      : "hover:bg-teal-100"
                  }`}
                  onClick={(event) => handleSelectLanguage(event, "rust")}
                >
                  rust
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Editor
            onMount={props.handleEditorDidMount}
            className="mt-4"
            height="24rem"
            language={props.selectedLanguage}
            defaultLanguage={props.selectedLanguage}
            value={props.codeBlockInput}
            defaultValue={props.codeBlockInput}
            onChange={onCodeBlockInputChange}
            autoFocus
          />
        </div>
      </div>
    );
  } else if (props.selectedType === "Image") {
    contentInputForm = (
      <div className="flex flex-col w-full gap-2">
        <input
          ref={props.imageRef}
          className="px-4 py-2 focus:outline-none"
          type="url"
          id="imageSrc"
          name="imageSrc"
          value={props.imageSrcInput}
          placeholder="Enter image url..."
          onChange={onImageSrcInputChange}
          autoFocus
        />
        <input
          className="px-4 py-2 focus:outline-none"
          type="text"
          id="imageCaption"
          name="imageCaption"
          value={props.imageCaptionInput}
          placeholder="Enter image caption..."
          onChange={onImageCaptionInputChange}
        />
      </div>
    );
  } else if (props.selectedType === "Link") {
    contentInputForm = [
      <input
        ref={props.linkRef}
        key="linkText"
        className="px-4 py-2 focus:outline-none"
        type="text"
        id="linkText"
        name="linkText"
        value={props.linkTextInput}
        placeholder="Enter label..."
        onChange={onLinkTextInputChange}
        autoFocus
      />,
      <input
        key="linkUrl"
        className="px-4 py-2 focus:outline-none"
        type="text"
        id="linkUrl"
        name="linkUrl"
        value={props.linkUrlInput}
        placeholder="Enter url..."
        onChange={onLinkUrlInputChange}
      />,
    ];
  } else if (props.selectedType === "List") {
    contentInputForm = [
      <div key={"listTypeOptions"} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-50">List type:</span>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="listType"
              value="bulleted"
              onChange={handleListTypeChange}
              checked={props.selectedListType === "bulleted"}
            />
            <span>Bulleted List</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="listType"
              value="numbered"
              onChange={handleListTypeChange}
              checked={props.selectedListType === "numbered"}
            />
            <span>Numbered List</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="listType"
              value="plain"
              onChange={handleListTypeChange}
              checked={props.selectedListType === "plain"}
            />
            <span>Plain Text</span>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="itemCount" className="text-gray-50">
            No. of items:
          </label>
          <input
            ref={props.listRef}
            className="text-center rounded-sm focus:outline-none font-semibold"
            type="number"
            name="itemCount"
            value={props.itemCount}
            min={1}
            onChange={onItemCountChange}
            autoFocus
          />
        </div>
      </div>,
      <div
        key="listInputs"
        ref={listInputs}
        className="flex flex-col gap-2 w-full mt-2"
      >
        {renderInputs()}
      </div>,
    ];
  }

  return (
    <Fragment>
      {/* Content Form */}
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto px-8 py-8 bg-teal-500 shadow-lg rounded-lg">
        <div className="flex flex-col w-full gap-2">
          <div className="relative  flex-1 flex flex-col gap-2 w-full">
            <label className="text-gray-50" htmlFor="content">
              Content:
            </label>
            <button
              className="flex items-center justify-between w-full bg-gray-50 px-4 py-2"
              type="button"
              onClick={props.toggleTypeOptions}
            >
              <span>{props.selectedType}</span> <FaAngleDown />
            </button>
            <div className="relative">
              <ul
                className={`absolute top-full left-0 z-10 w-96 overflow-hidden bg-white transition-all duration-300 rounded-md shadow-lg ${
                  props.isTypeOptionsOpen ? "h-72" : "h-0"
                }`}
              >
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "Header" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>Header</span>
                </li>
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "Paragraph" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>Paragraph</span>
                </li>
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "Code Block" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>Code Block</span>
                </li>
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "Image" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>Image</span>
                </li>
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "List" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>List</span>
                </li>
                <li
                  className={`cursor-pointer p-3 hover:bg-teal-100 transition-colors duration-300 ${
                    props.selectedType === "Link" &&
                    "bg-teal-200 hover:bg-teal-200"
                  }`}
                  onClick={props.onSelectType}
                >
                  <span>Link</span>
                </li>
              </ul>
            </div>
          </div>

          {contentInputForm}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onSaveItemContent}
              className="px-3 py-1.5 rounded-md bg-gray-50 text-sm"
            >
              {props.updatingContentItem ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="flex items-center w-full gap-2">
          <button
            className="px-4 py-2 bg-teal-900 text-gray-50 rounded-lg mt-14 w-1/2"
            type="button"
            onClick={props.handleFormPrev}
          >
            Back
          </button>
          <input
            className="px-4 py-2 bg-teal-900 text-gray-50 rounded-lg mt-14 flex-1 enabled:opacity-100 enabled:cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            type="submit"
            value="Save"
          />
        </div>
      </div>
    </Fragment>
  );
}
