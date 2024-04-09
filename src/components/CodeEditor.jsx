import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import Language from "./Language";
import { code_snippets } from "../constants";
import Output from "./Output";
import NightOwl from "monaco-themes/themes/Night Owl.json";
import { motion, useAnimation, useInView } from "framer-motion";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const onChange = (value) => {
    setValue(value);
  };
  const [language, setLanguage] = useState("javascript");
  const onSelect = (newlanguage) => {
    setLanguage(newlanguage);
    setValue(code_snippets[newlanguage]);
  };

  const editorRef = useRef();
  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };
  const setTheme = (monaco) => {
    monaco.editor.defineTheme("NightOwl", NightOwl);
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 1.5, delay: 0.25 }}
        className="flex md:flex-row text-white flex-col"
      >
        <div className=" md:w-[65%] p-4 w-full ">
          <Language language={language} onSelect={onSelect} />
          <div className="flex flex-row md:h-[75vh] h-[55vh]">
            <Editor
              theme="NightOwl"
              language={language}
              onMount={onMount}
              value={value}
              defaultValue={code_snippets["javascript"]}
              onChange={onChange}
              beforeMount={setTheme}
              options={{
                inlineSuggest: true,
                fontSize: "16px",
                formatOnType: true,
                autoClosingBrackets: true,
                minimap: { scale: 5 },
              }}
            />
          </div>
        </div>
        <div className="md:w-[35%] mt-5 p-4">
          <div className="flex flex-col">
            <Output editorRef={editorRef} language={language} />
          </div>
          
        </div>
      </motion.div>
    </>
  );
};
export default CodeEditor;
