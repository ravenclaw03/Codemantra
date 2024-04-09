import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../main";
const URL = import.meta.env.VITE_URL;
const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [auth,setAuth]=useState(false);
  const [message,setMessage]=useState("");
  const[name,setName]=useState("");
  const [retryCount, setRetryCount] = useState(0);
   const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const maxRetries = 3;
  useEffect(() => {
    const checkAuth = async()=>{
      try {
        const response = await axios.get(`${URL}/check`, {
          withCredentials: true,
        });
        if(response.data.Status==="Success"){
          setAuth(true);
          setLoggedIn(true);
          setName(response.data.name);
        }
        else{
          setAuth(false);
          setMessage(response.data.Message);
        }
      } catch (error) {
        console.log(error)
        if (retryCount < maxRetries) {
          setRetryCount(retryCount + 1);
        }
      }
    };   
   if (retryCount < maxRetries) {
     checkAuth();
   }
  }, [retryCount])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/submissions`);
        setSubmissions(response.data);
      } catch (error) {
        console.log(error);
        if (retryCount < maxRetries) {
          setRetryCount(retryCount + 1);
        }
      }
    };
    if (retryCount < maxRetries) {
      fetchData();
    }
  }, [retryCount]);

  return (
    <>
      {auth ? (
        <div>
          <h1 className="text-white text-4xl m-4 p-2 text-center underline">
            Student Submissions
          </h1>
          <div className="flex justify-center">
            <table className=" text-white border-2 m-3">
              <thead>
                <tr>
                  <th className=" m-2 p-1 border-2 md:table-cell hidden">S.No.</th>
                  <th className=" m-2 p-1 border-2">Student Name</th>
                  <th className=" m-2 p-1 border-2">Source Code</th>
                  <th className=" m-2 p-1 border-2">Input</th>
                  <th className=" m-2 p-1 border-2">Output</th>
                  <th className=" m-2 p-1 border-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className=" m-2 p-1 border-2 md:table-cell hidden">
                      {submission.id}
                    </td>
                    <td className=" m-2 p-1 border-2">{submission.name}</td>
                    <td className=" m-2 p-1 border-2">
                      {submission.sourceCode.substring(0, 100)}
                    </td>
                    <td className=" m-2 p-1 border-2">{submission.input}</td>
                    <td className=" m-2 p-1 border-2">{submission.output}</td>
                    <td className=" m-2 p-1 border-2">
                      {submission.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-4xl text-white flex justify-center m-4 flex-col items-center">
          <div className="flex md:flex-row text-red-600 flex-col">
            <h1 className="mx-2">{message}</h1>
            <p>Login to check submissions.</p>
          </div>
          <Link to="/">
            <p className=" hover:underline text-xl m-2">
              Click here to return to the Code Editor.
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Submissions;
