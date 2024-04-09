import axios from "axios";
import { useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
const URL=import.meta.env.VITE_URL;
const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const pollSubmissionResult = async (submissionId) => {
    try {
      const resultResponse = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY, // Replace with your API key
          },
        }
      );
      const { status } = resultResponse.data;
      if (status.id === 3) {
        // Submission is completed
        //console.log(resultResponse.data);
        setOutput(resultResponse.data.stdout);
      } else if (status.id < 3) {
        // Submission is still processing, poll again after some time
        setTimeout(() => {
          pollSubmissionResult(submissionId);
        }, 1000); // Poll every 1 second, you can adjust this value as needed
      } else {
        // Submission failed or encountered an error
        console.log("error");
        setOutput(resultResponse.data.stderr);
        console.log(resultResponse.data);
      }
    } catch (error) {
      console.log(error.response.data);
      setOutput("Error! Check Your Code Again.")
    }
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    let langId = 63;
    if (language == "cpp") {
      langId = 54;
    } else if (language == "java") {
      langId = 62;
    } else if (language == "python") {
      langId = 71;
    }
    try {
      setOutput("");
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: sourceCode,
          language_id: langId,
          stdin: input,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY, // Replace with your API key
          },
        }
      );
      const submissionId = response.data.token;
      pollSubmissionResult(submissionId);
    } catch (error) {
      console.log(error);
    }
  };
  const [timestamp, setTimestamp] = useState("");
  const [name,setName]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const sourceCode = editorRef.current.getValue();
    const currentTimestamp = new Date().toISOString();
    setTimestamp(currentTimestamp); // Set the timestamp to the current time
    try {
      const response = await axios.post(`${URL}/submit`, {
      name,
      sourceCode,
      timestamp: currentTimestamp,
      output,
      input,
      });
      if (response.data.Status === "Success") {
      alert("Submitted successfully!");
      window.location.reload();
      } else {
      alert(response.data.Message);
      }
    } catch (error) {
      alert("Error! Try again later.")
      console.error(error);
    }
  };
  return (
    <>
      <div className=" my-3">
        <h3>Input</h3>
        <textarea
          type="text"
          name="input"
          value={input}
          onChange={onChange}
          className=" bg-transparent border px-1 border-slate-100/20 h-[10vh] w-full overflow-hidden whitespace-normal"
          placeholder="Input for program (Optional)"
        />
      </div>
      <button
        className=" border px-2 py-1 hover:bg-[#001d3d] w-[90px]"
        onClick={runCode}
      >
        Run Code
      </button>
      <br />
      <h3 className="my-3">Output</h3>
      <pre className=" bg-transparent border px-1 border-slate-100/20 h-[40vh] max-w-xl overflow-hidden whitespace-normal">
        {output}
      </pre>
      <div className=" my-9 text-white flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="border-2 border-slate-100/20 rounded-md py-1 px-2 focus:bg-gray-700 text-white bg-transparent mx-3"
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" border-2 px-2 py-1 hover:bg-[#001d3d] text-sm "
          >
            Submit Code
          </button>
        </form>
      </div>
    </>
  );
};
export default Output;
