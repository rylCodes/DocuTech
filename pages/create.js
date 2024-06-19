import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import FormMetadata from "@/components/ui/FormMetadata";
import FormContent from "@/components/ui/FormContent";
import Preview from "@/components/ui/Preview";
import { server } from "@/config";
import { languages } from "../data/programmingLanguages";
import { delay } from "../utils/delay.js";
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "@/context/AuthContext";

export default function create({
  isCreatingNewDocs,
  isUpdatingDocs,
  setIsCreatingNewDocs,
}) {
  const { token, currentUser } = useAuth();
  const [step, setStep] = useState(1);

  const [selectedType, setSelectedType] = useState("Header");
  const [selectedIcon, setSelectedIcon] = useState("FaLaptopCode");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const [isIconOptionsOpen, setIsIconOptionsOpen] = useState(false);
  const [isTypeOptionsOpen, setIsTypeOptionsOpen] = useState(false);
  const [isLanguageOptionsOpen, setIsLanguageOptionsOpen] = useState(false);

  const [key, setKey] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    author: currentUser,
    icon: selectedIcon,
    description: "",
    tags: "",
    content: [],
  });

  const [originalFormData, setOriginalFormData] = useState({
    title: "",
    author: currentUser,
    icon: selectedIcon,
    description: "",
    tags: "",
    content: [],
  });

  const [iconDisplayed, setIcondisplayed] = useState("Gears");

  const router = useRouter();

  useEffect(() => {
    const storedFormdata = localStorage.getItem("formData");
    if (storedFormdata) {
      setFormData(JSON.parse(storedFormdata));
    }

    if (typeof window !== "undefined") {
      getCookie("token");
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(originalFormData) !== JSON.stringify(formData)) {
      setFormData((prevData) => prevData);
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [{ ...formData }]);

  useEffect(() => {
    if (selectedIcon === "FaGears") {
      setIcondisplayed("Gears");
    } else if (selectedIcon === "FaLaptopCode") {
      setIcondisplayed("Laptop Code");
    } else if (selectedIcon === "FaScrewdriverWrench") {
      setIcondisplayed("Screwdriver Wrench");
    } else if (selectedIcon === "FaTabletScreenButton") {
      setIcondisplayed("Tablet Screen Button");
    } else if (selectedIcon === "FaBookOpenReader") {
      setIcondisplayed("Book Open Reader");
    } else if (selectedIcon === "FaLightbulb") {
      setIcondisplayed("Light Bulb");
    } else if (selectedIcon === "FaBox") {
      setIcondisplayed("Box");
    } else if (selectedIcon === "FaArrowDown") {
      setIcondisplayed("Arrow Down");
    }
  }, [selectedIcon]);

  function refreshFormData() {
    setFormData({
      title: "",
      author: "",
      icon: selectedIcon,
      description: "",
      tags: "",
      content: [],
    });
  }

  function handleChange(e, inputName, validatorFunc) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === inputName) {
      validatorFunc(value.trim() === "");
    }
  }

  function addToContent(objectValue) {
    formData.content.push(objectValue);
    setKey((prevKey) => prevKey + 1);
  }

  function toggleTypeOptions() {
    setIsTypeOptionsOpen((prevState) => !prevState);
  }

  function toggleIconOptions() {
    setIsIconOptionsOpen((prevState) => !prevState);
  }

  function toggleLanguageOptions() {
    setIsLanguageOptionsOpen((prevState) => !prevState);
  }

  function onSelectType(e) {
    setSelectedType(e.target.textContent);
    setIsTypeOptionsOpen(false);
  }

  function onSelectIcon(e, value) {
    setSelectedIcon(value);
    setIcondisplayed(e.target.textContent);
    setIsIconOptionsOpen(false);
  }

  function onSelectLanguage(e, value) {
    setSelectedLanguage(value);
    setIsLanguageOptionsOpen(false);
  }

  function handleFormNext() {
    setStep((prevStep) => prevStep + 1);
  }

  function handleFormPrev() {
    setStep((prevStep) => prevStep - 1);
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        server + "/api/documentations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;

      await setIsCreatingNewDocs(false);
      await router.push("/");
      refreshFormData();
      localStorage.removeItem("formData");
      alert(result.message);
    } catch (error) {
      console.error(error);
      const errorMessages = error.response.data && error.response.data.errors;
      if (errorMessages) {
        alert(
          (errorMessages.title && errorMessages.title[0]) ||
            (errorMessages.author && errorMessages.author[0]) ||
            (errorMessages.description && errorMessages.description[0]) ||
            (errorMessages.tags && errorMessages.tags[0]) ||
            (errorMessages.content && errorMessages.content[0])
        );

        if (errorMessages.content && errorMessages.content[0]) {
          setStep(2);
        } else {
          setStep(1);
        }
      } else {
        alert("An error occured! Please try again later.");
      }
    }
  }

  function onRemoveMetaData(data) {
    setFormData((prevData) => ({
      ...prevData,
      [data]: "",
    }));
  }

  function onRemoveContent(index) {
    setFormData((prevData) => ({
      ...prevData,
      content: prevData.content.filter((item, i) => i !== index),
    }));
  }

  // Update Content Item's Data
  const [contentIndex, setContentIndex] = useState(null);
  const [updatingContentItem, setUpdatingContentItem] = useState(false);

  const [headerInput, setHeaderInput] = useState("");
  const headerRef = useRef(null);
  const [paragraphInput, setParagraphInput] = useState("");
  const paragraphRef = useRef(null);
  const [codeBlockInput, setCodeBlockInput] = useState(
    languages.javascript.value
  );
  const editorRef = useRef(null);
  const [selectedListType, setSelectedListType] = useState("bulleted");
  const [itemCount, setItemCount] = useState(3);
  const [listItems, setListItems] = useState([]);
  const listRef = useRef(null);
  const [imageSrcInput, setImageSrcInput] = useState("");
  const [imageCaptionInput, setImageCaptionInput] = useState("");
  const imageRef = useRef(null);
  const [linkTextInput, setLinkTextInput] = useState("");
  const [linkUrlInput, setLinkUrlInput] = useState("");
  const linkRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editorRef.current.focus();
  }

  async function editMetaData(inputLabel) {
    setStep(1);
    await delay(100);
    if (inputLabel === "title") {
      titleRef.current.focus();
    } else if (inputLabel === "author" && authorRef.current) {
      authorRef.current.focus();
    } else if (inputLabel === "description" && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }

  async function editContentItem(index) {
    setContentIndex(index);
    setUpdatingContentItem(true);
    if (formData.content[index].type === "Header") {
      setSelectedType("Header");
      setHeaderInput(formData.content[index].text);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        headerRef.current && headerRef.current.focus();
      }
    } else if (formData.content[index].type === "Paragraph") {
      setSelectedType("Paragraph");
      setParagraphInput(formData.content[index].text);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        paragraphRef.current && paragraphRef.current.focus();
      }
    } else if (formData.content[index].type === "Code Block") {
      setSelectedType("Code Block");
      setSelectedLanguage(formData.content[index].language);
      setCodeBlockInput(formData.content[index].code);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        editorRef.current && editorRef.current.focus();
      }
    } else if (formData.content[index].type === "List") {
      setSelectedType("List");
      setSelectedListType(formData.content[index].listType);
      setItemCount(formData.content[index].items.length);
      setListItems(formData.content[index].items);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        listRef.current && listRef.current.focus();
      }
    } else if (formData.content[index].type === "Image") {
      setSelectedType("Image");
      setImageSrcInput(formData.content[index].url);
      setImageCaptionInput(formData.content[index].caption);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        imageRef.current && imageRef.current.focus();
      }
    } else if (formData.content[index].type === "Link") {
      setSelectedType("Link");
      setLinkTextInput(formData.content[index].text);
      setLinkUrlInput(formData.content[index].url);
      await delay(100);
      if (step === 1) {
        setStep(2);
      } else {
        linkRef.current && linkRef.current.focus();
      }
    }
  }

  function onUpdateItemContent() {
    if (selectedType === "Header") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          { type: "Header", text: headerInput },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setHeaderInput("");
      headerRef.current.focus();
    } else if (selectedType === "Paragraph") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          { type: "Paragraph", text: paragraphInput },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setParagraphInput("");
      paragraphRef.current.focus();
    } else if (selectedType === "Code Block") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          {
            type: "Code Block",
            code: codeBlockInput,
            language: selectedLanguage,
          },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setCodeBlockInput(
        (prevValue) => (prevValue = languages[selectedLanguage].value)
      );
      editorRef.current.focus();
    } else if (selectedType === "List") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          {
            type: "List",
            items: listItems,
            listType: selectedListType,
          },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setListItems([]);
      listRef.current.focus();
    } else if (selectedType === "Image") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          { type: "Image", url: imageSrcInput, caption: imageCaptionInput },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setImageCaptionInput("");
      setImageSrcInput("");
      imageRef.current.focus();
    } else if (selectedType === "Link") {
      setFormData((prevData) => ({
        ...prevData,
        content: [
          ...prevData.content.slice(0, contentIndex),
          { type: "Link", url: linkUrlInput, text: linkTextInput },
          ...prevData.content.slice(contentIndex + 1),
        ],
      }));
      setLinkTextInput("");
      setLinkUrlInput("");
      linkRef.current.focus();
    }
  }

  return (
    <div className="w-full px-4 mx-auto py-12">
      <form onSubmit={onSubmit} className="w-full">
        {step === 1 && (
          <div className="flex flex-col w-full gap-8 lg:flex-row">
            <div className="w-full lg:w-2/5">
              <FormMetadata
                handleFormNext={handleFormNext}
                toggleIconOptions={toggleIconOptions}
                onSelectIcon={onSelectIcon}
                selectedIcon={selectedIcon}
                isIconOptionsOpen={isIconOptionsOpen}
                handleChange={handleChange}
                formData={formData}
                iconDisplayed={iconDisplayed}
                setIsCreatingNewDocs={setIsCreatingNewDocs}
                isCreatingNewDocs={isCreatingNewDocs}
                isUpdatingDocs={isUpdatingDocs}
                titleRef={titleRef}
                authorRef={authorRef}
                descriptionRef={descriptionRef}
                refreshFormData={refreshFormData}
                originalFormData={originalFormData}
              />
            </div>
            {/* Preview */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-center w-full px-4">
                Preview
              </h3>
              <div className="rounded-lg shadow-sm border flex-1 p-8 mt-4">
                <Preview
                  documentation={formData}
                  onRemoveMetaData={onRemoveMetaData}
                  onRemoveContent={onRemoveContent}
                  editContentItem={editContentItem}
                  titleRef={titleRef}
                  authorRef={authorRef}
                  descriptionRef={descriptionRef}
                  editMetaData={editMetaData}
                />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col w-full gap-8 lg:flex-row">
            <div className="w-full lg:w-2/5">
              <FormContent
                handleFormPrev={handleFormPrev}
                toggleTypeOptions={toggleTypeOptions}
                toggleLanguageOptions={toggleLanguageOptions}
                onSelectType={onSelectType}
                addToContent={addToContent}
                selectedType={selectedType}
                isTypeOptionsOpen={isTypeOptionsOpen}
                handleChange={handleChange}
                isLanguageOptionsOpen={isLanguageOptionsOpen}
                onSelectLanguage={onSelectLanguage}
                selectedLanguage={selectedLanguage}
                headerInput={headerInput}
                setHeaderInput={setHeaderInput}
                headerRef={headerRef}
                paragraphInput={paragraphInput}
                setParagraphInput={setParagraphInput}
                paragraphRef={paragraphRef}
                codeBlockInput={codeBlockInput}
                setCodeBlockInput={setCodeBlockInput}
                editorRef={editorRef}
                updatingContentItem={updatingContentItem}
                setUpdatingContentItem={setUpdatingContentItem}
                onUpdateItemContent={onUpdateItemContent}
                selectedListType={selectedListType}
                setSelectedListType={setSelectedListType}
                itemCount={itemCount}
                setItemCount={setItemCount}
                listItems={listItems}
                setListItems={setListItems}
                listRef={listRef}
                imageSrcInput={imageSrcInput}
                setImageSrcInput={setImageSrcInput}
                imageCaptionInput={imageCaptionInput}
                setImageCaptionInput={setImageCaptionInput}
                imageRef={imageRef}
                linkTextInput={linkTextInput}
                setLinkTextInput={setLinkTextInput}
                linkUrlInput={linkUrlInput}
                setLinkUrlInput={setLinkUrlInput}
                linkRef={linkRef}
                handleEditorDidMount={handleEditorDidMount}
              />
            </div>

            {/* Preview */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-center px-4">Preview</h3>
              <div className="rounded-lg shadow-sm border flex-1 p-8 mt-4">
                <Preview
                  key={key}
                  documentation={formData}
                  onRemoveMetaData={onRemoveMetaData}
                  onRemoveContent={onRemoveContent}
                  editContentItem={editContentItem}
                  editMetaData={editMetaData}
                  titleRef={titleRef}
                  authorRef={authorRef}
                  descriptionRef={descriptionRef}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
