import { language_versions } from "../constants"

const langs=Object.entries(language_versions)
const Language = ({language,onSelect}) => {
const handleChange = (event) => {
       onSelect(event.target.value);
     };
return (
  <div className="p-2">
    <h5 className=" text-slate-100/20 p-1">Language:</h5>
    <select
      className=" bg-[#001d3d] "
      onChange={handleChange}
      value={language}
    >
      {langs.map(([index, lang]) => (
        <option key={index} value={lang} className="bg-[#000814]">
          {index}
        </option>
      ))}
    </select>
  </div>
);
}
export default Language